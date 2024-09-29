import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Not a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' })
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Not a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
});

export const AccountSettingsSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Cannot be empty.' })
    .max(50, { message: 'Name is too long.' }),
  email: z
    .string()
    .min(1, { message: 'Cannot be empty.' })
    .email({ message: 'Invalid email address.' })
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' })
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'] // The field to attach the error message to
  });
