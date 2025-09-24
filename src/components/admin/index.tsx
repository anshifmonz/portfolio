'use client';

import React from 'react';
import Posts from './posts';
import NewPost from './new-post';
import Settings from './settings';
import Dashboard from './dashboard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui/tabs';

const TAB_CONFIG = [
  { label: 'Dashboard', value: 'dashboard', component: <Dashboard /> },
  { label: 'Posts', value: 'posts', component: <Posts /> },
  { label: 'New Post', value: 'new-post', component: <NewPost /> },
  { label: 'Settings', value: 'settings', component: <Settings /> }
];

export default function Admin() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center">
        <main className="w-full max-w-5xl min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6 text-start">
              <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
              <p className="text-lg text-muted-foreground">Manage your blog content and settings</p>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
              <TabsList className="w-full px-0 flex justify-between items-center gap-2 bg-muted rounded-md mb-4">
                {TAB_CONFIG.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`
                flex-1 text-base font-semibold px-4 py-2 rounded-lg border-2 border-solid border-accent
                transition-colors duration-200
                ${
                  activeTab === tab.value
                    ? 'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:hover:text-accent data-[state=active]:hover:bg-transparent shadow-md'
                    : 'bg-transparent text-accent hover:bg-accent hover:text-accent-foreground'
                }
              `}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {TAB_CONFIG.map(tab => (
                <TabsContent key={tab.value} value={tab.value} className="w-full">
                  {tab.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
