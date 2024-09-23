import { count } from 'console';
import * as z from 'zod';

export const NewPasswordSchema = z.object({
   password: z.string().min(8, 'Minimum 8 characters are required'),
   confirmPassword: z.string().min(8, 'Minimum 8 characters are required'),
   }).refine(data => data.password === data.confirmPassword, {
   message: 'Passwords do not match',
   path: ['confirmPassword'],
});

export const ResetSchema = z.object({
   email: z.string().email({
      message: 'Email is Required',
   }),
});

export const LoginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(1, 'Password is required'),
});

export const RegisterSchema = z.object({
   name: z.string().min(3, 'Minimum 3 characters are required'),
   email: z.string().email(),
   password: z.string().min(8, 'Minimum 8 characters are required'),
   confirmPassword: z.string().min(8, 'Minimum 8 characters are required'),
}).refine(data => data.password === data.confirmPassword, {
   message: 'Passwords do not match',
   path: ['confirmPassword'], // Set the path of the error to the confirmPassword field
});


export const AddressSchema = z.object({
   phone: z.string().min(6, 'Minimum 6 characters are required'),
   country : z.string().min(3, 'Minimum 3 characters are required'),
   address: z.string().min(10, 'Minimum 10 characters are required'),
   state: z.string().min(3, 'Minimum 3 characters are required'),
   city: z.string().min(3, 'Minimum 3 characters are required'),
   zip: z.string().min(6, 'Minimum 6 characters are required'),
   otherInformation: z.string().optional(),
});