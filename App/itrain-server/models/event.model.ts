
// Primero las importaciones

import { Schema, Document, model } from 'mongoose';

// Creamos la instancia de esquma

const eventSchema = new Schema({


    title: {
        type: String
    },
    description: {
        type: String
    },

    startTime: {
        type: Date
    },

    endTime: {
        type: Date
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',                                                   // Referencia al usuario
        required: [true, 'Debe de existir una referencia a un usuario'] // Es requerido
    }
});


// Interface del schema
interface IEvent extends Document {

    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    user: string;

}

// Lo exportamos
export const Event = model<IEvent>('Event', eventSchema);