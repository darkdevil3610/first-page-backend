import { GraphQLError } from 'graphql';
import Text from '../../models/Text.js';

const editText = async (root, args) => {
  const text = await Text.findById(args.id);
  const { name, description, link } = args;
  text.name = name;
  text.description = description;
  text.link = link;

  try {
    await text.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'SERVER_DATABASE_ERROR',
        invalidArgs: args,
      },
    });
  }
  return text;
};

export default editText;
