/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import typeDefs from './typeDefs/typeDefs.js';
import resolvers from './resolvers/resolvers.js';
import { dbReady } from './db/db.js';
import User from './models/User.js';
import Admin from './models/Admin.js';
import ensureAdminSeed from './utils/seedAdmin.js';

const verifyToken = (token) => {
  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new GraphQLError('Not Authenticated', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
      },
    });
  }
};

await dbReady;
await ensureAdminSeed();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const PORT = Number(process.env.PORT);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT || 1111 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
      const tk = auth.substring(7);

      const decodedToken = verifyToken(tk);

      if (!decodedToken) {
        throw new GraphQLError('Not Authenticated', {
          extensions: {
            code: 'AUTHENTICATION_ERROR',
          },
        });
      }

      const { id } = decodedToken;
      const currentUser = await User.findById(id);
      return { currentUser };
    }
    if (auth && auth.toLocaleLowerCase().startsWith('admin')) {
      const tk = auth.substring(6);

      const decodedToken = verifyToken(tk);

      if (!decodedToken) {
        throw new GraphQLError('Not Authenticated', {
          extensions: {
            code: 'AUTHENTICATION_ERROR',
          },
        });
      }

      const { id } = decodedToken;
      const currentAdmin = await Admin.findById(id);
      return { currentAdmin };
    }
  },
  introspection: true,
});

console.log(`Server ready at ${url}`);
