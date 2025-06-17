import { z } from 'zod';

export const donationSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  campaignId: z.string().min(1, 'Campaign ID is required'),
  anonymousName: z.string().optional(),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});
