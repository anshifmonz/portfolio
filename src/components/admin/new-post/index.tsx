'use client';

import { useState, useEffect } from 'react';
import { Input } from 'ui/input';
import { useToast } from 'ui/use-toast';
import { TagInput } from '../shared/TagInput';
import { Save, Eye } from 'lucide-react';
import EditorComponent from '../shared/EditorJS';
import { PostPreview } from '../shared/PostPreview';
import { Card, CardContent, CardHeader } from 'ui/card';
import { ActionButtonsGroup } from 'components/shared/ActionButtons';
import { mockApi } from 'lib/mockApi';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({});
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const tags = await mockApi.getTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await mockApi.createPost({
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
      await mockApi.createPost({
        title,
        content,
        tags,
        status: 'Published'
      });

      toast({
        title: 'Post published',
        description: 'Your post has been published successfully.'
      });
    } catch (error) {
      toast({
        title: 'Error publishing post',
        description: 'There was an error publishing your post.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const previewData = {
    title,
    content,
    tags,
    date: new Date().toISOString().split('T')[0],
    views: 0,
    author: 'Admin'
  };

  return (
    <div className="space-y-8">
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
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <ActionButtonsGroup
              buttons={[
                {
                  name: ['Save Draft', 'Saving...'],
                  variant: 'hire',
                  icon: <Save className="mr-2 h-4 w-4" />,
                  onClick: handleSaveDraft,
                  isProcessing: isSaving
                },
                {
                  name: 'Preview',
                  variant: 'hire',
                  icon: <Eye className="mr-2 h-4 w-4" />,
                  onClick: () => setShowPreview(true)
                },
                {
                  name: ['Publish', 'Publishing...'],
                  variant: 'talk',
                  icon: <Save className="mr-2 h-4 w-4" />,
                  onClick: handlePublish,
                  isProcessing: isSaving
                }
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <PostPreview post={previewData} isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}
