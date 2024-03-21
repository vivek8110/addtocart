import { User, role } from "../../../lib/models";

export const roleResolver = {
  Query: {
    getAllRoles: async (parent, args, context) => {
      const allRoles = await role.find();
    },
  },
};
