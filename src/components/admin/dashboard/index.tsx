import { Button } from 'ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';
import { FileText, PlusCircle, Users, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Posts',
    value: '12',
    description: 'Published blog posts',
    icon: FileText
  },
  {
    title: 'Draft Posts',
    value: '3',
    description: 'Unpublished drafts',
    icon: PlusCircle
  },
  {
    title: 'Page Views',
    value: '2,543',
    description: 'This month',
    icon: TrendingUp
  },
  {
    title: 'Subscribers',
    value: '156',
    description: 'Email subscribers',
    icon: Users
  }
];

const recentPosts = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    status: 'Published',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Building Modern UIs with Tailwind CSS',
    status: 'Draft',
    date: '2024-01-14'
  },
  {
    id: 3,
    title: 'TypeScript Best Practices',
    status: 'Published',
    date: '2024-01-12'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'Published'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {post.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
