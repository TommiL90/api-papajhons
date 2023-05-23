import app from './app';
import 'dotenv/config';
import prisma from './prisma';

const PORT = process.env.PORT || 3000;

app.locals.prisma = prisma;

app.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port ${PORT}`);
});
