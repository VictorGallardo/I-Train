import { Router, Response } from 'express'
import { validateToken } from '../middlewares/authentication';
import { Item } from '../models/item.model';


const itemRoutes = Router();


// Método GET para Obtener los items de una lista 

itemRoutes.get('/:listid', async (req: any, res: Response) => {


    const body = req.body;
    body.list = req.params.listid;

    const items = await Item
        .find(body)
        .sort({ _id: -1 })
        .exec()

    // Respuesta
    res.json({
        ok: true.valueOf,
        items
    });

});

// Método POST para crear items (item = Ejercicio)

itemRoutes.post('/:listid', (req: any, res: Response) => {

    const body = req.body;
    body.list = req.params.listid;


    // Grabar en DB
    Item.create(body).then(async itemDB => {

        // await itemDB.populate('list').execPopulate(); // Poblamos con la lista

        res.json({
            ok: true,
            item: itemDB
        });

    }).catch(err => {
        res.json(err)
    });

});

export default itemRoutes;