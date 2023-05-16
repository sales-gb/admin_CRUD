import { Router } from 'express';
import {
  createUsersController,
  listProfileController,
  listUserController,
  recoverUserController,
  softDeleteUserController,
  updateUserController,
} from '../controllers/users.controllers';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { reqUserSchema, updateUserSchema } from '../schemas/users.schemas';
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExixts.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';
import ensureUserHasPermission from '../middlewares/ensureUserHasPermission.middleware';
import ensureUserIsActiveMiddleware from '../middlewares/ensureUserIsActive.middleware';

const userRoutes: Router = Router();

userRoutes.post(
  '',
  ensureBodyIsValidMiddleware(reqUserSchema),
  ensureEmailExistsMiddleware,
  createUsersController,
);
userRoutes.get(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listUserController,
);
userRoutes.get('/profile', ensureTokenIsValidMiddleware, listProfileController);
userRoutes.patch(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureUserHasPermission,
  updateUserController,
);
userRoutes.delete(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserHasPermission,
  softDeleteUserController,
);
userRoutes.put(
  '/:id/recover',
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserIsAdminMiddleware,
  ensureUserIsActiveMiddleware,
  recoverUserController,
);

export default userRoutes;
