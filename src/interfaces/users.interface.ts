import { z } from 'zod';
import {
  reqUserSchema,
  resUserSchema,
  updateUserSchema,
  userSchema,
} from '../schemas/users.schemas';

type Tuser = z.infer<typeof userSchema>;

type TUserReq = z.infer<typeof reqUserSchema>;

type TUserRes = z.infer<typeof resUserSchema>;

type TUserUpdate = z.infer<typeof updateUserSchema>;

export { Tuser, TUserReq, TUserRes, TUserUpdate };
