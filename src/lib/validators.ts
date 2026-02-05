import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[!@#$%^&*]/, 'Must contain special character');

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password required'),
});

// Signup schema
export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Address schema
export const addressSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: emailSchema,
  phone: z.string().min(10, 'Invalid phone number'),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(5),
  country: z.string().min(2),
});

// Checkout schema
export const checkoutSchema = z.object({
  shipping: addressSchema,
  billing: addressSchema.optional(),
  paymentMethod: z.enum(['card', 'paypal', 'bank_transfer']),
  saveAddress: z.boolean().optional(),
});

// Product filter schema
export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  rating: z.number().min(0).max(5).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['newest', 'price-low', 'price-high', 'rating', 'bestseller']).optional(),
});

// Chat message schema
export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(1000),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductFilterInput = z.infer<typeof productFilterSchema>;
