import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message: 'Invalid password',
  }),
})

export const signUpSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().regex(passwordRegex, {
      message: 'Invalid password',
    }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
