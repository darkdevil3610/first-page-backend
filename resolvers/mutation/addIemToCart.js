import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const addItemToCart = async (root, { itemId }, context) => {
  const { currentUser } = context;

  if (!currentUser) {
    throw new GraphQLError('Not Authenticated', {
      extensions: {
        code: 'AUTHENTICATION_ERROR',
        http: { status: 401 },
      },
    });
  }

  try {
    const item = Item.findById(itemId);
    if (!item) throw new Error();
  } catch (err) {
    throw new GraphQLError('Item not found');
  }

  currentUser.cart = currentUser.cart.concat(itemId);

  await currentUser.save();
  return currentUser.populate('cart');
};

export default addItemToCart;
