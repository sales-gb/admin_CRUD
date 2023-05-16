import { Request, Response } from 'express';
import { TLoginReq, TLoginRes } from '../interfaces/session.interfaces';
import createSessionService from '../services/login/createSession.service';

const createSessionController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userData: TLoginReq = req.body;
  const token: TLoginRes = await createSessionService(userData);
  return res.json(token);
};

export { createSessionController };
