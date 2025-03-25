//import { UserInputError, AuthenticationError } from 'apollo-server-express';
import User from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';
//import type { Resolvers } from '@apollo/server-express';
//import type { Context } from '../types/context';
import type { UserDocument } from '../models/User';

interface MeArgs {}

interface LoginArgs {
    email: string;
    password: string;
}

interface AddUserArgs {
    username: string;
    email: string;
    password: string;
}

interface SaveBookArgs {
    input: {
        bookId: string;
        authors: string[];
        description: string;
        title: string;
        image: string;
        link: string;
    };
}

interface RemoveBookArgs {
    bookId: string;
}

const resolvers: any = {
    Query: {
        me: async (_parent: undefined, _args: MeArgs, context: any): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const foundUser = await User.findById(context.user._id);
            return foundUser;
        },
    },

    Mutation: {
        login: async (_parent: undefined, { email, password }: LoginArgs): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        addUser: async (_parent: undefined, args: AddUserArgs): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.create(args);
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: undefined, { input }: SaveBookArgs, context: any): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        },

        removeBook: async (_parent: undefined, { bookId }: RemoveBookArgs, context: any): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );

            return updatedUser;
        },
    },
};

export default resolvers;
