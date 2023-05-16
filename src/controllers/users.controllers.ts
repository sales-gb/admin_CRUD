import { Request, Response } from 'express';
import { TUserReq, TUserRes, TUserUpdate } from '../interfaces/users.interface';
import createUserService from '../services/users/createUsers.service';
import listUserService from '../services/users/listUsers.service';
import listProfileService from '../services/users/listProfile.service';
import { AppError } from '../error';
import updateUserService from '../services/users/updateUser.service';
import softDeleteUserService from '../services/users/deleteUsers.service';
import recoverUserService from '../services/users/recoverUser.service';

const createUsersController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userData: TUserReq = { ...req.body, active: true };
  const newUser: TUserRes = await createUserService(userData);
  return res.status(201).json(newUser);
};

const listUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const users = await listUserService();
  return res.json(users);
};

const listProfileController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = res.locals.token.id;
  const user = await listProfileService(userId);
  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const payload: TUserUpdate = req.body;
  const user: TUserRes = await updateUserService(payload, Number(id));

  return res.status(200).json(user);
};

const softDeleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  await softDeleteUserService(Number(id));

  res.status(204).send();
};

const recoverUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const user = await recoverUserService(Number(id));

  return res.status(200).json(user);
};

export {
  createUsersController,
  listUserController,
  listProfileController,
  updateUserController,
  softDeleteUserController,
  recoverUserController,
};
