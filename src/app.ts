import './libs/dayjs.config';

import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';

import { routes } from './routes/index.routes';

import { defaultErrorHandler } from './errors/default.handler';

import { env } from './utils/env.utils';

export const app = fastify()
  .register(cors, { origin: true })
  .register(helmet, { global: true })
  .register(import('@fastify/redis'), { url: env.UPSTASH_REDIS_REST_URL })
  .register(routes, { prefix: '/' })
  .setErrorHandler(defaultErrorHandler);
