import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().min(4).max(120),
  admin: z.boolean().optional(),
  active: z.boolean().optional().default(true),
});

const reqUserSchema = userSchema.omit({ id: true });

const resUserSchema = userSchema.omit({ password: true });

const updateUserSchema = reqUserSchema.partial();

export { userSchema, reqUserSchema, resUserSchema, updateUserSchema };
