import { z } from 'zod';

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(30),
  email: z.string().email().toLowerCase().trim().min(1, 'Email is required'),
  password: z
    .string()
    .regex(
      regex,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim().min(1, 'Email is required'),
  password: z
    .string()
    .regex(
      regex,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export default {
  registerSchema,
  loginSchema,
};
