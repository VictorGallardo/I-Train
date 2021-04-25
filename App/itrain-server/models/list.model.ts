
// Primero las importaciones

import { Schema, Document, model } from 'mongoose';

// Creamos la instancia de esquma

const listSchema = new Schema({

    // Fecha de creación
    // Se crea automaticamente
    created: {
        type: Date
    },

    // Si las listas están terminadas
    completed: {
        type: Boolean,
        default: false
    },

    // Los items que contendrá la lista
    // Es decir los ejercicios.
    items: [{
        type: String
    }],

    // Titulo de la lista
    // String en mayúsculas
    title: {
        type: String
    },

    //El usuario.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',                                                   // Referencia al usuario
        required: [true, 'Debe de existir una referencia a un usuario'] // Es requerido
    }
});

// Esto es para crear la fecha automaticamente
listSchema.pre<IList>('save', function (next) {
    this.created = new Date();
    next();
});




// Interface del schema
interface IList extends Document {

    created: Date;
    completed: boolean;
    items: string[];
    title: string;
    user: string;

}

// Lo exportamos
export const List = model<IList>('List', listSchema);



