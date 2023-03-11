import fastify from "fastify";
import './libs/dayjs.config';

import { studentRoutes } from "./routes/student.routes";

const app = fastify();

app.register(studentRoutes, { prefix: '/student' });

app.listen({
	host: '0.0.0.0',
	port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
	console.log("🚀 Server is running...")
});