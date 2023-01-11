import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkExistingUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (user === null) {
    throw new Error('User with provided email does not exist');
  }

  return user;
};

export default checkExistingUserByEmail;
