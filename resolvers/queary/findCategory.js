import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const findCategory = async (root, { category }) => {
  let items;
  try {
    items = await Item.find({ tags: { $in: [new RegExp(category, 'i')] } });
  } catch (err) {
    throw new GraphQLError(`${err.message}no funciona`);
  }

  return items;
};

export default findCategory;
