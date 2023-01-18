import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import IContext from '../../../types/IContext';

const prisma = new PrismaClient();

interface IExtractedTokenData {
  email: string;
  password: string;
}

const authorizeFromToken = async (ctx: IContext) => {
  if (ctx.req.headers.authorization === undefined) {
    throw new Error('Token not provided.');
  }

  const token = ctx.req.headers.authorization.split(' ')[1];

  try {
    var decoded = jwt.verify(
      token,
      process.env.JSONWEBTOKEN_KEY as string
    ) as IExtractedTokenData;

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      include: { animals: true },
    });

    if (user === null) {
      throw new Error('User with provided credentials in token do not exist.');
    }

    return user;
  } catch (err) {
    throw new Error('Provided invalid token.');
  }
};

export default authorizeFromToken;
