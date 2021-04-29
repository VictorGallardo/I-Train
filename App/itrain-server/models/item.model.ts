// Modelo de items 
// Seran los ejercicios de los usuarios

import { Schema, Document, model } from 'mongoose'

const itemSchema = new Schema({


    // Título del ejercicio
    title: {
        type: String
    },

    // Descripción del ejercicio
    description: {
        type: String
    },

    // Fecha de creación
    created: {
        type: Date
    },

    // Si esta terminado o no
    completed: {
        type: Boolean,
        default: false
    },

    // Tiempo de preparación 
    preparation: {
        type: Number,
    },

    // Número de series
    sets: {
        type: Number,
    },

    // Tiempo del ejercicio
    time: {
        type: Number,
    },

    // Descanso entre series
    restSets: {
        type: Number,
    },

    // Número de repeticiones
    repeats: {
        type: Number,
    },

    // Descanso entre repeticiones
    restReps: {
        type: Number,
    },

    // Tiempo total (lo que dura el ejercicio completo)
    totalTime: {
        type: Number,
    },

    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: [true, 'Debe existir una referencia a una lista']

    }

});

itemSchema.pre<IItem>('save', function (next) {
    this.created = new Date();
    next();
});

interface IItem extends Document {

    title: string;
    description: string;
    created: Date;
    completed: boolean;
    preparation: number;
    sets: number;
    time: number;
    restSets: number;
    repeats: number;
    restReps: number;
    totalTime: number;
    list: string;

}

export const Item = model<IItem>('Item', itemSchema);