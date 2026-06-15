/* eslint-disable eqeqeq */
import { GraphQLError } from 'graphql';

const removeItemCart = async (root, { id }, context) => {
  const { currentUser } = context;

  if (!currentUser) {
    throw new GraphQLError('Not Authenticated', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        http: { status: 401 },
      },
    });
  }

  const index = currentUser.cart.findIndex((i) => i == id);
  if (index === -1) throw new GraphQLError('USER INPUT ERROR');
  currentUser.cart.splice(index, 1);

  await currentUser.save();
  return currentUser.populate('cart');
};

export default removeItemCart;
