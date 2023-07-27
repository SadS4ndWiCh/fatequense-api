import { env } from './utils/env.utils';

import { app } from './app';

app.listen(
  {
    host: env.HOST,
    port: process.env.PORT ? env.PORT : 3333,
  },
  (err, addr) => {
    if (err) throw new Error(err.message);

    console.log(`🚀 Running at: ${addr}`);
  },
);
