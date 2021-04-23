// Imports
import Server from "./classes/server";
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'

import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';
import fileUpload from 'express-fileupload';
import listRoutes from './routes/list.routes';
import itemRoutes from './routes/item.routes';

const server = new Server();


// Body parser
server.app.use(bodyparser.urlencoded({ extended: true }));
server.app.use(bodyparser.json());


// FileUpload
server.app.use(fileUpload({ useTempFiles: true }));


// Cors
server.app.use(cors({ origin: true, credentials: true }));


// Rutas de la app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
server.app.use('/lists', listRoutes);
server.app.use('/items', itemRoutes);


// Conexión DB
mongoose.connect('mongodb://localhost:27017/itrain',
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {

        if (err) throw err;
        console.log('Base de datos Online');

    })


// Levanta express
server.start(() => {
    console.log(`Servidor funcionando en puerto: ${server.port}`);
});
