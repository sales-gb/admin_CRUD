import { z } from 'zod';

const reqLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const resLoginSchema = z.object({
  token: z.string(),
});

export { reqLoginSchema, resLoginSchema };
