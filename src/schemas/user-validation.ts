import { z } from 'zod';

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const createSchema = z.object({
  name: z.string().min(1, 'Name is required').max(30),
  email: z.string().email().toLowerCase().trim().min(1, 'Email is required'),
  password: z
    .string()
    .regex(
      regex,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().trim().optional(),
  address: z.string().optional(),
  post: z.string().optional(),
});

const addressSchema = z.object({
  street: z.string().min(1, 'street is required').max(30),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(30),
  body: z.string().min(1, 'Body is required'),
});

export default {
  updateSchema,
  createSchema,
  addressSchema,
  postSchema,
};
