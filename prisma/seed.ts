import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import config from "../src/config"
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash(
    config.seed.password!,
    Number(config.hashRound)
  )

  const user = await prisma.user.upsert({
    where: {
      email: config.seed.email,
    },
    update: {},
    create: {
      name: config.seed.name as string,
      email: config.seed.email as string,
      username: config.seed.username as string,
      password: hashedPassword,
    },
  })

  return { user }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
