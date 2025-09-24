'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from 'ui/input';
import { Badge } from 'ui/badge';
import { Button } from 'ui/button';
import { useToast } from 'ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';
import { Popover, PopoverContent, PopoverTrigger } from 'ui/popover';
import { Search, Edit, Trash2, Eye, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui/select';
import { mockApi, type BlogPost, type PostFilters } from 'lib/mockApi';

export default function Posts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PostFilters>({
    search: '',
    status: 'All',
    tags: []
  });
  const [tempDateFilters, setTempDateFilters] = useState({
    dateFrom: '',
    dateTo: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
    loadTags();
  }, [filters]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await mockApi.getPosts(filters);
      setPosts(postsData);
    } catch (error) {
      toast({
        title: 'Error loading posts',
        description: 'There was an error loading the posts.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await mockApi.getTags();
      setAllTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status: status as PostFilters['status'] }));
  };

  const handleTagFilter = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const handleDateFilter = () => {
    setFilters(prev => ({
      ...prev,
      dateFrom: tempDateFilters.dateFrom || undefined,
      dateTo: tempDateFilters.dateTo || undefined
    }));
  };

  const clearDateFilter = () => {
    setTempDateFilters({ dateFrom: '', dateTo: '' });
    setFilters(prev => ({
      ...prev,
      dateFrom: undefined,
      dateTo: undefined
    }));
  };

  const handleDeletePost = async (postId: number) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await mockApi.deletePost(postId);
        toast({
          title: 'Post deleted',
          description: 'The post has been deleted successfully.'
        });
        loadPosts(); // Reload posts
      } catch (error) {
        toast({
          title: 'Error deleting post',
          description: 'There was an error deleting the post.',
          variant: 'destructive'
        });
      }
    }
  };

  const hasActiveFilters =
    filters.tags?.length ||
    filters.dateFrom ||
    filters.dateTo ||
    (filters.status && filters.status !== 'All');

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={filters.search}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>

            {/* Status Filter */}
            <Select value={filters.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="All">
                  All Status
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Published">
                  Published
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Draft">
                  Draft
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-40">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From Date</label>
                    <Input
                      type="date"
                      value={tempDateFilters.dateFrom}
                      onChange={e =>
                        setTempDateFilters(prev => ({ ...prev, dateFrom: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To Date</label>
                    <Input
                      type="date"
                      value={tempDateFilters.dateTo}
                      onChange={e =>
                        setTempDateFilters(prev => ({ ...prev, dateTo: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleDateFilter} size="sm" className="flex-1">
                      Apply
                    </Button>
                    <Button
                      onClick={clearDateFilter}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Tag Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full lg:w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  Tags {filters.tags?.length ? `(${filters.tags.length})` : ''}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Filter by Tags</h4>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                        className={`cursor-pointer ${
                          filters.tags?.includes(tag)
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                        onClick={() => handleTagFilter(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.tags?.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-accent/20 text-accent cursor-pointer"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
              {filters.dateFrom && (
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  From: {filters.dateFrom}
                </Badge>
              )}
              {filters.dateTo && (
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  To: {filters.dateTo}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="bg-card border-border">
              <CardHeader>
                <div className="animate-pulse space-y-2">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No posts found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <Card key={post.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <CardTitle className="text-xl text-foreground hover:text-accent cursor-pointer">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            onClick={() => handleTagFilter(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={post.status === 'Published' ? 'default' : 'secondary'}
                    className={
                      post.status === 'Published'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }
                  >
                    {post.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/edit-post/${post.id}`}>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
