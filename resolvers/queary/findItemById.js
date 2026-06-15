import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const findItemById = async (root, { id }) => {
  let item;
  try {
    item = await Item.findById(id);
  } catch (err) {
    GraphQLError(err.message);
  }
  return item;
};

export default findItemById;
