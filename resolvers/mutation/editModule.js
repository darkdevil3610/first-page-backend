import { GraphQLError } from 'graphql';
import Image from '../../models/Image.js';
import Text from '../../models/Text.js';

const editModule = async (root, args) => {
  const { images, texts } = args;
  try {
    const editsImages = images.map(async (img) => {
      await Image.findByIdAndUpdate(img.id, {
        src: img.src,
        srcMobile: img.srcMobile,
        alt: img.alt,
        link: img.link,
      });
    });

    const editsTexts = texts.map(async (txt) => {
      await Text.findByIdAndUpdate(txt.id, {
        name: txt.name,
        description: txt.description,
        link: txt.link,
      });
    });

    Promise.all([...editsImages, ...editsTexts]);
  } catch (err) {
    throw new GraphQLError(`Algo salio mal :b, ya fue intenta mas tarde ${err}`, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }

  return {
    image: images,
    text: texts,
  };
};

export default editModule;
