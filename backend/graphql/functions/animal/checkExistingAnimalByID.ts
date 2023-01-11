import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkExistingAnimalByID = async (id: string) => {
  const animal = await prisma.animal.findFirst({ where: { id } });

  if (animal === null) {
    throw new Error('Animal with provided id does not exist');
  }

  return animal;
};

export default checkExistingAnimalByID;
