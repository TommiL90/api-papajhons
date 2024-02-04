import { PrismaClient } from '@prisma/client'
import { env } from '../env'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['warn', 'error'] : [],
})

export default prisma
