// Imports
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


// Modelo usuario

const userSchema: Schema<any> = new Schema({

    name: {
        type: String,
        require: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    role: {
        type: String,
        enum: ['basic', 'admin'],
        default: 'basic'

    },

    avatar: {
        type: String,
        default: 'userDefault.png'
    },

    // lists: [{
    //     type: String
    // }],

});

userSchema.method('comparePassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});


// Interface para el tipado del modelo
export interface Iuser extends Document {

    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;

    comparePassword(password: string): boolean;

}

export const User = model<Iuser>('User', userSchema);