import IContext from '../../../types/IContext';
import * as jwt from 'jsonwebtoken';

interface IExtractedTokenData {
  email: string;
  password: string;
}

const getTokenData = (ctx: IContext) => {
  if (ctx.req.headers.authorization === undefined) {
    throw new Error('Token not provided.');
  }

  const token = ctx.req.headers.authorization.split(' ')[1];

  try {
    var decoded = jwt.verify(
      token,
      process.env.JSONWEBTOKEN_KEY as string
    ) as IExtractedTokenData;

    return decoded;
  } catch (err) {
    throw new Error('Provided invalid token.');
  }
};

export default getTokenData;
