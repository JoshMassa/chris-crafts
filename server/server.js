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
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

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
    
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

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

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadsDir);
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        });

        const upload = multer({ storage });

        app.post('/upload', upload.single('file'), (req, res) => {
            const file = req.file;
            if (!file) {
                console.error('No file uploaded');
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const filePath = file.path;

            cloudinary.uploader.upload(filePath, { use_filename: true, unique_filename: false }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }
                res.json({
                    filename: result.public_id,
                    url: result.secure_url,
                });

                fs.unlink(filePath, (error) => {
                    if (error) {
                        console.error('Error deleting file:', error);
                    }
                });
            });
        });
        
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
