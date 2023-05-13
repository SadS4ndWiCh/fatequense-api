import cors from '@fastify/cors';
import fastify from 'fastify';

import './libs/dayjs.config';

import { authRoutes } from './routes/auth.routes';
import { studentRoutes } from './routes/student.routes';

import { defaultErrorHandler } from './errors/default.handler';

export const app = fastify()
  .register(cors, { origin: true })
  .register(studentRoutes, { prefix: '/student' })
  .register(authRoutes, { prefix: '/auth' })
  .setErrorHandler(defaultErrorHandler);
