import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const createUser = async (root, args) => {
  const {
    username, name, lastname, password, phone,
  } = args;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username, name, lastname, password: hashedPassword, phone,
  });

  try {
    await user.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_INVALID',
        invalidArgs: args,
      },
    });
  }

  const tokenForUser = {
    id: user.id,
    username,
  };

  const { JWT_SECRET } = process.env;

  return {
    value: jwt.sign(tokenForUser, JWT_SECRET),
  };
};

export default createUser;
