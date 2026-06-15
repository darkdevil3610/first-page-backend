import { GraphQLError } from 'graphql';
import Item from '../../models/Item.js';

const editItem = async (root, args) => {
  const {
    id, name, cost, stock, description, brand, src,
  } = args;
  let item;

  try {
    item = await Item.findById(id);
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: id,
      },
    });
  }

  item.name = name;
  item.cost = cost;
  item.src = src;
  item.stock = stock;
  item.description = description;
  item.brand = brand;

  try {
    await item.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return item;
};

export default editItem;
