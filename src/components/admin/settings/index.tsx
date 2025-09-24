import { Input } from 'ui/input';
import { Label } from 'ui/label';
import { Button } from 'ui/button';
import { Textarea } from 'ui/textarea';
import { Separator } from 'ui/separator';
import { Save, User, Globe, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Profile Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@blog.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell readers about yourself..."
              defaultValue="Passionate blogger sharing insights about technology and development."
            />
          </div>
        </CardContent>
      </Card>

      {/* Blog Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5" />
            Blog Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blogTitle">Blog Title</Label>
            <Input id="blogTitle" defaultValue="My Awesome Blog" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blogDescription">Blog Description</Label>
            <Textarea
              id="blogDescription"
              placeholder="Describe your blog..."
              defaultValue="A collection of thoughts, tutorials, and insights about modern web development."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blogUrl">Blog URL</Label>
            <Input id="blogUrl" defaultValue="https://myblog.com" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about your blog</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Comment Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone comments</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Report</Label>
              <p className="text-sm text-muted-foreground">Weekly summary of your blog stats</p>
            </div>
            <Button variant="outline" size="sm">
              Disable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
