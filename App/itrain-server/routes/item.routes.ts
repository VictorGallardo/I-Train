import { Router, Response } from 'express'
import { Item } from '../models/item.model';

const itemRoutes = Router();


// Metodo GET obtener un item por su id

itemRoutes.get('/search/:itemid', async (req: any, res: Response) => {

    const body = req.body;
    body._id = req.params.itemid;
    const items = await Item

        .findById(body).exec();              // Ejecuta

    // Respuesta
    res.json({
        ok: true,
        items
    });

});


// Método GET para Obtener los items de una lista

itemRoutes.get('/:listid', async (req: any, res: Response) => {

    // let page = Number(req.query.page) || 1;
    // let skip = page - 1;
    // skip = skip * 10;

    const body = req.body;
    body.list = req.params.listid;

    const items = await Item
        .find(body)           // Busca por id user
        .sort({ _id: -1 })    // Ordena
        // .skip(skip)           // Paginación
        // .limit(10)            // Muestra solo 10
        .populate('list')
        .exec()               // Ejecuta

    // Respuesta
    res.json({
        ok: true,
        // page,
        items
    });

});

// Método POST para crear items (item = Ejercicio)

itemRoutes.post('/:listid', (req: any, res: Response) => {

    const body = req.body;
    body.list = req.params.listid;

    // Grabar en DB
    Item.create(body).then(async itemDB => {

        await itemDB.populate('list').execPopulate();

        res.json({
            ok: true,
            item: itemDB
        });

    }).catch(err => {
        res.json(err)
    });

});

export default itemRoutes;