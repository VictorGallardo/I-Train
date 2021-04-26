import { Router, Response } from 'express';
import { validateToken } from '../middlewares/authentication';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';


const postRoutes = Router();
const fileSystem = new FileSystem();

// Obtener post paginados
postRoutes.get('/', async (req: any, res: Response) => {

    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 10;

    const posts = await Post
        .find()
        .sort({ _id: -1 })              // Ordena los post por la ultima entrada
        .skip(skip)                     // Paginación
        .limit(10)                      // Muestra solo 10 
        .populate('user', '-password')  // Rellena el usuario, pero no la contraseña
        .exec();

    res.json({
        ok: true,
        page,
        posts
    });

});


// Crear post
postRoutes.post('/', [validateToken], (req: any, res: Response) => {

    const body = req.body; // El body es el cuerpo de todo lo que voy a meter en la DB
    body.user = req.user._id; // Id del usuario que lo obtengo del token
    const images = fileSystem.imagesTempToPost(req.user._id); // Obtengo lad imágenes
    body.imgs = images; // Busca el array de imágenes e inserta la imagen

    Post.create(body).then(async postDB => {

        // Con esto obtengo todo el objeto usuario
        await postDB.populate('user', '-password').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });

    }).catch(err => {
        res.json(err)
    })

});

// Servicio para subir archivos
// Esto sirve para subir cualquier tipo de archivo
postRoutes.post('/upload', [validateToken], async (req: any, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se subió ningún archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se subió ningún archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            message: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.saveTempImage(file, req.user._id);


    return res.json({
        ok: true,
        file: file.mimetype
    });

});

postRoutes.get('/image/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathPhoto = fileSystem.getPhotoUrl(userId, img);

    res.sendFile(pathPhoto);
});


export default postRoutes