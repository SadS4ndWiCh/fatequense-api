import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.routes';
import { studentRoutes } from './student.routes';

export async function routes(app: FastifyInstance) {
  app
    .register(studentRoutes, { prefix: '/student' })
    .register(authRoutes, { prefix: '/auth' });
}
