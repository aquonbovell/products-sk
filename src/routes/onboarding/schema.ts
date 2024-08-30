import { z } from 'zod';

export const userSchema = z.object({
	username: z.string().min(2).max(50),
	userId: z.string().min(10).max(50),
	email: z.string().email(),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	roles: z.array(z.string())
});

export type UserSchema = typeof userSchema;
