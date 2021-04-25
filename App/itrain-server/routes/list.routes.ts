import { Router, Response } from 'express'
import { validateToken } from '../middlewares/authentication';
import { List } from '../models/list.model';


const listRoutes = Router();


// Obtener las listas del usuario logeado: mediante su token y su id

listRoutes.get('/', [validateToken], async (req: any, res: Response) => {

    let page = Number(req.query.page) || 1; // Si regresa undefined o NaN regresa a la página 1
    let skip = page - 1;
    skip = skip * 10

    const body = req.body;
    body.user = req.user._id;
    const idList = req.body._id

    const lists = await List
        .find(body)           // Busca por id user
        .sort({ _id: -1 })    // Ordena
        .skip(skip)           // Paginacion
        .limit(10)            // Limite 10 ultimas
        .exec()               // Ejecuta

    // Respuesta    
    res.json({
        ok: true.valueOf,
        page,
        lists,
        idList

    });

});


// Crear Listas ----------------------------------------------------

listRoutes.post('/', [validateToken], (req: any, res: Response) => {

    // Insercción
    // Con el body parser obtenemos toda la información que la persona manda
    const body = req.body;
    body.user = req.user._id;
    body._id = req.body._id

    // Grabar en la base de datos
    List.create(body).then(async listDB => {

        // Aqui el registro ya se ha creado en la DB
        // ---------------------------------------------------------------
        // Esto es para que llene el usuario con toda su info
        // El -password no muestra la contraseña
        await listDB.populate('user', '-password').execPopulate();
        // listDB.items.push({ lists: 'kskdkks' })
        // await listDB.save();

        res.json({
            ok: true,
            list: listDB

        });

    }).catch(err => { // Si sucede algún error
        res.json(err)
    });
});


// listRoutes.get('/list/:userid/:listid', (req: any, res: Response) => {


//     const userId = req.params.userid;
//     const listId = req.params.listid;

//     const body = req.body;
//     body.user = req.user._id;
//     const list = body.lists

//     res.json({
//         userId, listId, list
//     })
// });


export default listRoutes;