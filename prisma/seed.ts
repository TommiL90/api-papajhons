import { Prisma, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const createUsers = async () => {
  for (let i = 0; i < 300; i++) {
    const username = `${faker.internet.userName()}-${i}`
    const email = `${faker.internet.userName()}-${i}@mail.com`
    const user = await prisma.user.create({
      data: {
        username,
        email,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: '123456',
      },
    })
    console.log({ user })
  }
}
const createCategories = async () => {
  for (let i = 0; i < 100; i++) {
    const name = faker.commerce.product()
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: {
        name,
      },
    })
    console.log({ category })
  }
}
const retrieveCategories = async () => {
  const result = await prisma.category.findMany()
  return result
}

const createProducts = async () => {
  for (let i = 0; i < 1500; i++) {
    const category = await retrieveCategories()

    const product = await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        description: faker.commerce.productDescription(),
        price: new Prisma.Decimal(faker.commerce.price()),
        sku: i,
        stock: 100,
        categoryId: category[Math.floor(Math.random() * category.length)].id,
      },
    })
    console.log({ product })
  }
}
async function main() {
  await Promise.all([createUsers(), createCategories()])
  await createProducts()
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
