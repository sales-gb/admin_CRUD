import { z } from 'zod';
import { reqLoginSchema, resLoginSchema } from '../schemas/login.schemas';

type TLoginReq = z.infer<typeof reqLoginSchema>;

type TLoginRes = z.infer<typeof resLoginSchema>;

export { TLoginReq, TLoginRes };
