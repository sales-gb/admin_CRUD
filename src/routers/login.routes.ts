import { Router } from 'express';
import { createSessionController } from '../controllers/login.controllers';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { reqLoginSchema } from '../schemas/login.schemas';
import ensureUserIsActiveSessionMiddleware from '../middlewares/ensureUserIsActiveSession.middleware';
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExixts.middleware';

const loginRouter = Router();

loginRouter.post(
  '',
  ensureBodyIsValidMiddleware(reqLoginSchema),
  ensureUserIsActiveSessionMiddleware,
  createSessionController,
);

export default loginRouter;
