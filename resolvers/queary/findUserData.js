import { GraphQLError } from 'graphql';

const findUserData = async (root, args, context) => {
  const { currentUser } = context;
  if (!currentUser) {
    throw new GraphQLError('Not autenticate', {
      extensions: {
        code: 'ATENTIATE_ERROR',
        http: { status: 401 },
      },
    });
  }
  return currentUser.populate('cart');
};

export default findUserData;
