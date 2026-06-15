import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const findAllItems = async () => {
  let items;
  try {
    items = await Item.find({});
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return items;
};

export default findAllItems;
