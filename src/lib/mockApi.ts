// Mock API functions for blog functionality

export interface BlogPost {
  id: number;
  title: string;
  content: any;
  excerpt: string;
  status: 'Draft' | 'Published';
  date: string;
  views: number;
  tags: string[];
  author?: string;
}

// Mock posts data
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    content: { blocks: [] },
    excerpt: 'Learn the fundamentals of React Hooks and how they can simplify your components...',
    status: 'Published',
    date: '2024-01-15',
    views: 1250,
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: 2,
    title: 'Building Modern UIs with Tailwind CSS',
    content: { blocks: [] },
    excerpt:
      'Discover how to create beautiful and responsive user interfaces using Tailwind CSS...',
    status: 'Draft',
    date: '2024-01-14',
    views: 0,
    tags: ['CSS', 'Design', 'Frontend']
  },
  {
    id: 3,
    title: 'TypeScript Best Practices',
    content: { blocks: [] },
    excerpt: 'Essential TypeScript patterns and practices for building robust applications...',
    status: 'Published',
    date: '2024-01-12',
    views: 890,
    tags: ['TypeScript', 'JavaScript', 'Best Practices']
  },
  {
    id: 4,
    title: 'Advanced State Management',
    content: { blocks: [] },
    excerpt: 'Deep dive into state management patterns for complex React applications...',
    status: 'Draft',
    date: '2024-01-10',
    views: 0,
    tags: ['React', 'State Management', 'Architecture']
  }
];

export interface PostFilters {
  search?: string;
  tags?: string[];
  status?: 'All' | 'Published' | 'Draft';
  dateFrom?: string;
  dateTo?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Get all posts with optional filtering
  async getPosts(filters: PostFilters = {}): Promise<BlogPost[]> {
    await delay(500);

    let filteredPosts = [...mockPosts];

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filteredPosts = filteredPosts.filter(post =>
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }

    // Filter by status
    if (filters.status && filters.status !== 'All') {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status);
    }

    // Filter by date range
    if (filters.dateFrom) {
      filteredPosts = filteredPosts.filter(
        post => new Date(post.date) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filteredPosts = filteredPosts.filter(
        post => new Date(post.date) <= new Date(filters.dateTo!)
      );
    }

    return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Get a single post by ID
  async getPost(id: number): Promise<BlogPost | null> {
    await delay(300);
    return mockPosts.find(post => post.id === id) || null;
  },

  // Create a new post
  async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    await delay(800);

    const newPost: BlogPost = {
      id: Math.max(...mockPosts.map(p => p.id)) + 1,
      title: postData.title || 'Untitled Post',
      content: postData.content || { blocks: [] },
      excerpt: postData.excerpt || '',
      status: postData.status || 'Draft',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      tags: postData.tags || [],
      author: 'Admin'
    };

    mockPosts.push(newPost);
    return newPost;
  },

  // Update an existing post
  async updatePost(id: number, postData: Partial<BlogPost>): Promise<BlogPost> {
    await delay(800);

    const postIndex = mockPosts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    mockPosts[postIndex] = { ...mockPosts[postIndex], ...postData };
    return mockPosts[postIndex];
  },

  // Delete a post
  async deletePost(id: number): Promise<void> {
    await delay(500);

    const postIndex = mockPosts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    mockPosts.splice(postIndex, 1);
  },

  // Get all available tags
  async getTags(): Promise<string[]> {
    await delay(200);

    const allTags = mockPosts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
  }
};
