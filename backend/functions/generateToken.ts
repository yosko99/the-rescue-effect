import * as jwt from 'jsonwebtoken';

const generateToken = (email: string, password: string) => {
  const token = jwt.sign(
    { email, password },
    process.env.JSONWEBTOKEN_KEY as string
  );

  return token;
};

export default generateToken;
