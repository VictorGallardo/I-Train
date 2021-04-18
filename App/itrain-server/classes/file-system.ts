import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';


export default class FileSystem {

    constructor() { };

    saveTempImage(file: FileUpload, userId: string) {

        return new Promise((resolve: any, reject) => {

            // Crear carpetas
            const path = this.createUserFolder(userId);

            // Nombre de archivo
            const fileName = this.generateUniqueName(file.name);

            // Mover archivo de Temp a la carpeta del usuario
            file.mv(`${path}/${fileName}`, (err: any) => {

                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            });

        });

    }

    // Generar nombre único para archivos
    private generateUniqueName(originalName: string) {

        const nameArr = originalName.split('.');
        const extension = nameArr[nameArr.length - 1];

        const uniqueId = uniqid();

        return `${uniqueId}.${extension}`

    }

    // Crear carpetas
    private createUserFolder(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        // console.log(pathUser);

        const exist = fs.existsSync(pathUser);

        if (!exist) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;

    }

    imagesTempToPost(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagesTemp = this.getImagesTemp(userId);

        imagesTemp.forEach(img => {
            fs.renameSync(`${pathTemp}/${img}`, `${pathPost}/${img}`)
        });

        return imagesTemp;

    }

    private getImagesTemp(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync(pathTemp) || [];

    }

    getPhotoUrl(userId: string, img: string) {

        // Path para las fotos
        const pathPhoto = path.resolve(__dirname, '../uploads/', userId, 'posts', img);

        // si la imagen existe
        const exist = fs.existsSync(pathPhoto);

        if (!exist) {
            return path.resolve(__dirname, '../assets/no-imagen.jpg') // Imagen en assets (imagen no avalible) Tengo que crearla en illustrator
        }

        return pathPhoto;
    }



}
