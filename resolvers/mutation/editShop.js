import { GraphQLError } from 'graphql';
import Shop from '../../models/Shop.js';

const editShop = async (root, args) => {
  const { shops } = args;

  try {
    const editShops = shops.map(async (shop) => {
      await Shop.findByIdAndUpdate(shop.id, {
        src: shop.src,
        city: shop.city,
        name: shop.name,
        direcction: shop.direcction,
        phone: shop.phone,
        email: shop.email,
        workingHours: shop.workingHours,
      });
    });

    Promise.all(editShops);
  } catch (err) {
    throw new GraphQLError(`Algo salio mal :b, ya fue intenta mas tarde ${err}`, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }

  return shops;
};

export default editShop;
