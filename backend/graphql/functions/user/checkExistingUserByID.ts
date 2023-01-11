import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkExistingUserByID = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id },
    include: { animals: true },
  });

  if (user === null) {
    throw new Error('User with provided id does not exist');
  }

  return user;
};

export default checkExistingUserByID;
