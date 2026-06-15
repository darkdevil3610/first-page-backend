import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const createItem = async (root, args) => {
  const item = new Item({ ...args });
  item.tags = ['', ''];
  try {
    await item.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }
  return item;
};

export default createItem;
