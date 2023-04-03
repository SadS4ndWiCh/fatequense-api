import './libs/dayjs.config';

import fastify from "fastify";
import cors from '@fastify/cors';

import { studentRoutes } from "./routes/student.routes";
import { authRoutes } from './routes/auth.routes';

export const app = fastify()
	.register(cors, { origin: true })
	.register(studentRoutes, { prefix: '/student' })
	.register(authRoutes, { prefix: '/auth' })