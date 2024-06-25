import User from '../models/User.js';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import auth from '../utils/auth.js';

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            const user = await UserActivation.findById(id);
            if (!user) {
                throw new Error('No user found with that ID');
            }
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        },
        users: async () => {
            const users = await User.find({});
            return users.map(async user => {
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                };
            });
        }
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const correctPw = await bcrypt.compare(password, user.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const token = auth.signToken({
                username: user.username,
                email: user.email,
                _id: user._id,
            });

            await user.save();

            return {
                token,
                user,
            };
        },
        logout: async (_, __, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { new: true }
                )
            }
        },
        signup: async (_, { username, email, password }, context) => {
            const emailExists = await User.findOne({ email });
            const usernameExists = await User.findOne({ username });

            if (emailExists) {
                throw new Error("Email is already in our system, please try a different email.");
            }

            if (usernameExists) {
                throw new Error("Username is already taken, please try a different username.");
            }

            const user = await User.create({
                username,
                email,
                password,
            });

            const token = auth.signToken(user);

            return {
                token,
                user,
            };
        }
    }
}

export default resolvers;