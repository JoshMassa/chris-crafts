import Cart from '../models/Cart.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Product from '../models/Product.js';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import auth from '../utils/auth.js';

const resolvers = {
    Query: {
        cartItems: async () => {
            return await CartItem.find();
        },
        events: async () => {
            return await Event.find({});
        },
        getCart: async (_, { userId }) => {
            try {
                const cart = await Cart.findOne({ userId }).exec();
                if (!cart) {
                    return {
                        id: null,
                        userId,
                        items: [],
                    };
                }
                
                return cart;
            } catch (error) {
                console.error('Error fetching cart:', error);
                throw new Error('Failed to fetch cart');
            }
        },
        products: async () => {
            return await Product.find({});
        },
        user: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('No user found with that ID');
            }
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.city,
                state: user.state,
                country: user.country,
                isAdmin: user.isAdmin,
            }
        },
        users: async () => {
            const users = await User.find({});
            return users.map(async user => {
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    city: user.city,
                    state: user.state,
                    country: user.country,
                    isAdmin: user.isAdmin,
                };
            });
        }
    },
    Mutation: {
        addEvent: async (_, { title, date, location, time, description }) => {
            const newEvent = new Event({ title, date, location, time, description });
            await newEvent.save();
            return newEvent;
        },
        addItemToCart: async (_, { userId, productId, quantity }) => {
            console.log(`Attempting to add item ${productId} to cart for user ${userId}`);
            try {
                // Find the product by ID
                const product = await Product.findById(productId).exec();
                console.log(`Found product:`, product);
                if (!product) {
                    throw new Error('No product found with that ID');
                }
                // Find or create a cart for the user
                let cart = await Cart.findOne({ userId }).exec();
                console.log(`Found cart:`, cart);
                if (!cart) {
                    cart = new Cart({ userId, items: [] });
                }

                // Check if the item already exists in the cart
                const existingItemIndex = cart.items.findIndex(item => item.product.id === productId);
                console.log(`Existing item index:`, existingItemIndex);

                if (existingItemIndex !== -1) {
                    // Update quantity if item already exists
                    cart.items[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to the cart
                    cart.items.push({
                        product: {
                            _id: product._id,
                            id: product.id,
                            title: product.title,
                            image: product.image,
                            price: product.price,
                            description: product.description,
                        },
                        quantity,
                    });
                }

                // Save the cart
                await cart.save();
                console.log('Cart after population:', cart);

                return cart;
            } catch (error) {
                // Log detailed error information
                console.error(`Error adding item ${productId} to the cart for user ${userId}:`, error);
                
                // Throw a specific error message based on different conditions
                if (error.message === 'No product found with that ID') {
                    throw new Error('Failed to add item to the cart: Product not found');
                } else if (error.name === 'ValidationError') {
                    // Handle Mongoose validation errors
                    const validationErrors = Object.values(error.errors).map(err => err.message);
                    throw new Error(`Failed to add item to the cart: Validation errors - ${validationErrors.join(', ')}`);
                } else {
                    // Handle other unexpected errors
                    throw new Error('Failed to add item to the cart: Unexpected error occurred');
                }
            }
        },
        removeItemFromCart: async (_, { userId, productId }) => {
            let cart = await Cart.findOne({ userId });
            if (cart) {
                cart.items = cart.items.filter(item => !item.product.id === productId);
                await cart.save
            }
            return cart;
        },
        addProduct: async (_, { title, image, price, description }) => {
            try {
                console.log('Received data for new product:', { title, image, price, description });
                const newProduct = new Product({ title, image, price, description });
                await newProduct.save();
                console.log('Product saved:', newProduct)
                return newProduct;
            } catch (error) {
                console.error('Failed to add product:', error);
                throw new Error('Failed to add product');
            }
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const correctPw = await bcrypt.compare(password, user.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const token = auth.signToken(user);
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
        setAdminStatus: async (_, { id, isAdmin }) => {
            return await User.findByIdAndUpdate(id, { isAdmin }, { new: true });
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
                isAdmin: false,
            });

            await user.save();

            const token = auth.signToken(user);

            return {
                token,
                user,
            };
        },
        updateUser: async (_, { id, input }) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
                return updatedUser;
            } catch (error) {
                console.error(err);
                throw new Error('Failed to update user');
            }
        },
    }
}

export default resolvers;