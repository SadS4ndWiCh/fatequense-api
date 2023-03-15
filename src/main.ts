import './libs/dayjs.config';

import fastify from "fastify";

import { studentRoutes } from "./routes/student.routes";
import { authRoutes } from './routes/auth.routes';

const app = fastify();

app
	.register(studentRoutes, { prefix: '/student' })
	.register(authRoutes, { prefix: '/auth' })
	.listen({
		host: '0.0.0.0',
		port: process.env.PORT ? Number(process.env.PORT) : 3333,
	}).then(() => {
		console.log("🚀 Server is running...")
	});