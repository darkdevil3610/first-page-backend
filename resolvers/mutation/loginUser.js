import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

const loginUser = async (root, args) => {
  const { username, password } = args;

  const user = await User.findOne({ username });

  const match = await bcrypt.compare(password, user?.password);

  if (!match || !user) {
    throw new GraphQLError('Wrong credentials', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        http: { status: 401 },
        invalidArgs: { ...args },
      },
    });
  }

  const { JWT_SECRET } = process.env;
  const tokenForUser = {
    id: user.id,
  };

  return {
    value: jwt.sign(tokenForUser, JWT_SECRET),
  };
};

export default loginUser;
