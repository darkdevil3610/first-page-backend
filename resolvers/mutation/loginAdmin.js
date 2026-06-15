/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import Admin from '../../models/Admin.js';

dotenv.config();

const loginAdmin = async (root, args) => {
  const { username, password } = args;

  const admin = await Admin.findOne({ username }) || { password: '' };

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw new GraphQLError('Wrong credentials', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        http: { status: 401 },
        invalidArgs: { ...args },
      },
    });
  }

  const adminForToken = {
    id: admin._id,
  };

  const { JWT_SECRET } = process.env;

  return {
    value: jwt.sign(adminForToken, JWT_SECRET),
  };
};

export default loginAdmin;
