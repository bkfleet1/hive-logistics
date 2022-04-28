const { User, Apiary, Hive, ShareFeeder } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (_parent, args) => {
      const user = await User.create({ ...args })
      const token = signToken(user);

      return { token, user };
    },
   
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password!");
      }

      const token = signToken(user);
      return { token, user };
    },

       addApiary: async (_parent, apiaryData, context) => {
      console.log(context);
      if (context.user) {
        const apiary = new Apiary({ apiaryData });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedApiary: apiaryData } },
          { new: true }
        );
        return apiary;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addHive: async (_parent, hiveData, context) => {
      console.log(context);
      if (context.user) {
        const hive = new Hive({ hiveData });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { Hive: hiveData } },
          { new: true }
        );
        return addHive;
      }
    },

    addBeeFeeder: async (_parent, beeFeederData, context) => {
      console.log(beeFeederData);
      if (context.user) {
        const feeder = new ShareFeeder({ beeFeederData });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { ShareFeeder: beeFeederData } },
          { new: true }
        );
        return feeder;
      }
    },

    // removeApiary: async (_parent, { _id }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedApiary: { _id } } },
    //       { new: true }
    //     );
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError("Not logged in");
    // },
  },
};

module.exports = resolvers;
