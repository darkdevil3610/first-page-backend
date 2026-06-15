import { GraphQLError } from 'graphql';
import Brand from '../../models/Brand.js';

const editBrand = async (root, args) => {
  const { brands } = args;

  try {
    const editBrands = brands.map(async (brand) => {
      await Brand.findByIdAndUpdate(brand.id, {
        src: brand.src,
        name: brand.name,
      });
    });

    Promise.all(editBrands);
  } catch (err) {
    throw new GraphQLError(`Algo salio mal :b, ya fue intenta mas tarde ${err}`, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }

  return brands;
};

export default editBrand;
