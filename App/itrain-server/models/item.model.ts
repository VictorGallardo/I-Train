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
        default: 0
    },

    // Número de series
    sets: {
        type: Number,
        default: 0
    },

    // Tiempo del ejercicio
    time: {
        type: Number,
        default: 0
    },

    // Descanso entre series
    restSets: {
        type: Number,
        default: 0
    },

    // Número de repeticiones
    repeats: {
        type: Number,
        default: 0
    },

    // Descanso entre repeticiones
    restReps: {
        type: Number,
        default: 0
    },

    // Tiempo total (lo que dura el ejercicio completo)
    totalTime: {
        type: Number, default: 0
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