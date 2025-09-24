'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from 'ui/input';
import { Button } from 'ui/button';
import { useToast } from 'ui/use-toast';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from 'ui/card';
import { TagInput } from 'components/admin/shared/TagInput';
import EditorComponent from 'components/admin/shared/EditorJS';
import { PostPreview } from 'components/admin/shared/PostPreview';
import { ActionButtonsGroup } from 'components/shared/ActionButtons';
import { mockApi, type BlogPost } from 'lib/mockApi';

export default function EditPost() {
  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const id = searchParams?.get('id') ?? '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({});
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPost();
    loadTags();
  }, [id]);

  const loadPost = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const postData = await mockApi.getPost(parseInt(id));
      if (postData) {
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
        setTags(postData.tags);
      } else {
        toast({
          title: 'Post not found',
          description: 'The requested post could not be found.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error loading post',
        description: 'There was an error loading the post.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const tags = await mockApi.getTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleSaveDraft = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await mockApi.updatePost(post.id, {
        title,
        content,
        tags,
        status: 'Draft'
      });

      toast({
        title: 'Draft saved',
        description: 'Your post has been saved as a draft.'
      });
    } catch (error) {
      toast({
        title: 'Error saving draft',
        description: 'There was an error saving your draft.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!post) return;

    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for your post.',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      await mockApi.updatePost(post.id, {
        title,
        content,
        tags,
        status: 'Published'
      });

      toast({
        title: 'Post updated',
        description: 'Your post has been updated successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error updating post',
        description: 'There was an error updating your post.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await mockApi.deletePost(post.id);
        toast({
          title: 'Post deleted',
          description: 'The post has been deleted successfully.'
        });
      } catch (error) {
        toast({
          title: 'Error deleting post',
          description: 'There was an error deleting the post.',
          variant: 'destructive'
        });
      }
    }
  };

  const previewData = {
    title,
    content,
    tags,
    date: post?.date,
    views: post?.views,
    author: post?.author
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
        <Button asChild>
          <Link href="/posts">Back to Posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
          </div>
        </div>

        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Post
        </Button>
      </div>

      {/* Editor Card */}
      <Card className="bg-card border-border">
        <CardHeader className="space-y-4">
          {/* Title Input */}
          <Input
            placeholder="Enter your post title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-2xl font-bold border-0 px-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ fontSize: '1.5rem', lineHeight: '2rem' }}
          />

          {/* Tags Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
            <TagInput
              tags={tags}
              onChange={setTags}
              suggestions={availableTags}
              placeholder="Add tags to categorize your post..."
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Editor */}
          <EditorComponent
            initialData={content}
            onChange={setContent}
            placeholder="Tell your story..."
          />

          {/* Action Buttons */}
          <ActionButtonsGroup
            buttons={[
              {
                name: 'Save Draft',
                href: '#portfolio',
                variant: 'hire'
              },
              {
                name: 'Preview',
                href: '#contact',
                variant: 'hire'
              },
              {
                name: 'Update Post',
                href: '#contact',
                variant: 'talk'
              }
            ]}
          />
          {/* <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            <Button
              onClick={handlePublish}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90"
            >
              {isSaving ? 'Updating...' : 'Update Post'}
            </Button>
          </div> */}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <PostPreview post={previewData} isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}
