import 'express-async-errors';
import express, { Application, json } from 'express';
import userRoutes from './routers/users.routes';
import { handleErrors } from './error';
import loginRouter from './routers/login.routes';

const app: Application = express();
app.use(json());

app.use('/users', userRoutes);
app.use('/login', loginRouter);

app.use(handleErrors);

export default app;
