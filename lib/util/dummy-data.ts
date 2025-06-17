import type { Campaign, BlogPost, User } from '@/types';

export const dummyCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Tech Education for Rural Communities',
    description: 'Providing computer literacy and coding bootcamps to underserved rural areas',
    goal: 50000,
    raised: 32500,
    image: '/api/placeholder/400/300',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '2',
    title: 'Women in Tech Scholarship Fund',
    description: 'Supporting women pursuing careers in technology through scholarships and mentorship',
    goal: 75000,
    raised: 45000,
    image: '/api/placeholder/400/300',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: '3',
    title: 'Digital Literacy for Seniors',
    description: 'Helping elderly community members navigate the digital world safely and confidently',
    goal: 25000,
    raised: 25000,
    image: '/api/placeholder/400/300',
    status: 'completed',
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-01-30'),
  },
];

export const dummyBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Impact of Technology on Community Development',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    excerpt: 'Exploring how technology initiatives are transforming communities across Kenya',
    image: '/api/placeholder/600/400',
    authorId: 'author1',
    published: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    title: 'Success Stories: From Bootcamp to Career',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    excerpt: 'Meet the graduates who transformed their lives through our tech education programs',
    image: '/api/placeholder/600/400',
    authorId: 'author2',
    published: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

export const dummyVolunteers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'volunteer',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'volunteer',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  // Add more volunteers as needed
];