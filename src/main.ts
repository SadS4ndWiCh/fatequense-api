import 'module-alias/register';
import { app } from './app';

app.listen(
  {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  },
  (err, addr) => {
    if (err) throw new Error(err.message);

    console.log(`🚀 Running at: ${addr}`);
  },
);
