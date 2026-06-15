import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const removeItem = async (root, { id }) => {
  try {
    await Item.findByIdAndDelete(id);
  } catch (err) {
    throw new GraphQLError(err.message);
  } return 'removed';
};

export default removeItem;
