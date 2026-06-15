import { GraphQLError } from 'graphql';

const findAdminData = async (root, args, context) => {
  const { currentAdmin } = context;
  if (!currentAdmin) {
    throw new GraphQLError('Not autenticate', {
      extensions: {
        code: 'ATENTIATE_ERROR',
        http: { status: 401 },
      },
    });
  }
  return currentAdmin;
};

export default findAdminData;
