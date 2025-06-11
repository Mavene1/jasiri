export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user' | 'volunteer';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Campaign {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    image: string;
    status: 'active' | 'completed' | 'draft';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Donation {
    id: string;
    amount: number;
    campaignId: string;
    userId?: string;
    anonymousName?: string;
    message?: string;
    createdAt: Date;
  }
  
  export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    authorId: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  }