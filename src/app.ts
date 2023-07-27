import './libs/dayjs.config';

import cors from '@fastify/cors';
import fastify from 'fastify';

import { authRoutes } from './routes/auth.routes';
import { studentRoutes } from './routes/student.routes';

import { defaultErrorHandler } from './errors/default.handler';

import { env } from './utils/env.utils';

export const app = fastify()
  .register(cors, { origin: true })
  .register(import('@fastify/redis'), { url: env.UPSTASH_REDIS_REST_URL })
  .register(studentRoutes, { prefix: '/student' })
  .register(authRoutes, { prefix: '/auth' })
  .setErrorHandler(defaultErrorHandler);
