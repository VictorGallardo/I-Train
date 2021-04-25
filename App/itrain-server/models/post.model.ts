import { Schema, Document, model } from 'mongoose';

// Esto es el esquema que crea en la base de datos
const postSchema = new Schema({

    created: {
        type: Date
    },
    message: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe de existir una referencia a un usuario']
    }

});


// Esto crea la fecha de forma automática cada vez que se cree un bloque
postSchema.pre<Ipost>('save', function (next) {
    this.created = new Date();
    next();
});


// Interface para la definición de nuestro esquema
interface Ipost extends Document {

    created: Date;
    message: string;
    img: string[];
    coords: string;
    user: string;

}

export const Post = model<Ipost>('Post', postSchema);