import prisma from "../../../utils/prisma-client"

const getMe = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
    },
  })

  return user
}

export const userService = {
  getMe,
}
