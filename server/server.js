import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import path from 'path';
import { connectToDatabase } from './config/connection.js';
import auth from './utils/auth.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000', 
    'https://chris-crafts.onrender.com',
];

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { token };
      },
});

async function startApolloServer() {
    try {
        await connectToDatabase();
        await server.start();
    
        app.use(cors({
            origin: (origin, callback) => {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true
        }));

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use('/graphql', expressMiddleware(server, { context: auth.authMiddleware }));
        
        if (process.env.NODE_ENV === 'production') {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            app.use(express.static(path.join(__dirname, '../client/dist')));
        
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../client/dist/index.html'));
            });
        }
        
        app.listen(PORT, () => {
            console.log(`View your development application at http://localhost:5173`)
            console.log(`Server now listening at http://localhost:${PORT}`);
            console.log(`Use the GraphQL Sandbox at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startApolloServer();
