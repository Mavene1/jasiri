export interface User {
    id: string;
    name: string;
    username:string;
    email: string;
    avatar?: string;
    role: 'individual' | 'cef' | 'organization' | 'nctc';
    firstName?: string;
    lastName?: string;
    mobile?: string;
    county?: string;
    profileComplete?: number;
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

  export interface ActivityData {
      activityId: string;
      title: string;
      description: string;
      pillar: 'AWARENESS' | 'PREVENTION' | 'PROTECTION' | 'RESPONSE';
      county: string;
      createdBy: string;
      csoId: string;
      status: 'PENDING' | 'APPROVED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
      scheduledDate: string;
      targetOutreach: number;
      location: string;
      createdAt: string;
  }
  
  export interface ActivityReport {
      reportId: string;
      activityId: string;
      filePath: string;
      fileName: string;
      mimeType: string;
      description: string;
      uploadedAt: string;
  }
  
  export interface CreateActivityForm {
      title: string;
      description: string;
      pillar: 'AWARENESS' | 'PREVENTION' | 'PROTECTION' | 'RESPONSE';
      county: string;
      csoId: string;
      scheduledDate: string;
      location: string;
  }

  export interface ReportDetailsProps {
    activityId: string
    reportId: string
}