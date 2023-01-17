import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import IContext from '../../../types/IContext';

const prisma = new PrismaClient();

interface IExtractedTokenData {
  email: string;
  password: string;
}

const getUserFromToken = async (ctx: IContext) => {
  if (ctx.req.headers.authorization === undefined) {
    return null;
  }

  const token = ctx.req.headers.authorization.split(' ')[1];

  try {
    var decoded = jwt.verify(
      token,
      process.env.JSONWEBTOKEN_KEY as string
    ) as IExtractedTokenData;

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    return user;
  } catch (err) {
    return null;
  }
};

export default getUserFromToken;
