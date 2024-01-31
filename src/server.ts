import app from './app';
import 'dotenv/config';
import prisma from './lib/prisma';
import { env } from './env';

const PORT = env.PORT

app.locals.prisma = prisma;

app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port ${PORT}`);
});
