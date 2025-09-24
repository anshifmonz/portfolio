import { useEffect } from 'react';
import { Badge } from 'ui/badge';
import { Calendar, Eye, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialog';
import hljs from 'highlight.js';
import type { BlogPost } from 'lib/mockApi';
import Output from 'editorjs-react-renderer'; // Import the renderer

interface PostPreviewProps {
  post: Partial<BlogPost> & { title: string };
  isOpen: boolean;
  onClose: () => void;
}

export function PostPreview({ post, isOpen, onClose }: PostPreviewProps) {
  // The syntax highlighting logic remains the same.
  // The renderer creates the HTML, and this effect highlights it.
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        hljs.highlightAll();
      }, 0);
    }
  }, [isOpen, post.content]);

  /**
   * You can customize the renderer for specific blocks.
   * This is useful for adding custom styling or logic.
   * Here's an example for our 'warning' block.
   */
  const renderers = {
    warning: ({ data }: { data: { title: string; message: string } }) => (
      <div className="my-6 p-4 bg-destructive/10 border-l-4 border-destructive text-destructive-foreground rounded-r-lg">
        <p className="font-bold" dangerouslySetInnerHTML={{ __html: data.title }} />
        <p dangerouslySetInnerHTML={{ __html: data.message }} />
      </div>
    ),
    code: ({ data }: { data: { code: string } }) => (
      <pre>
        <code className="hljs">{data.code}</code>
      </pre>
    )
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold text-foreground leading-tight">
            {post.title}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            )}
            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            )}
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-accent/20 text-accent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </DialogHeader>

        <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
          {post.content && <Output data={post.content} renderers={renderers} />}
          {(!post.content || !post.content.blocks || post.content.blocks.length === 0) && (
            <p className="text-muted-foreground italic">No content available for preview.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
