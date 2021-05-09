import { Router, Response } from 'express'
import { Item } from '../models/item.model';

const itemRoutes = Router();


// Metodo GET obtener un item por su id

itemRoutes.get('/search/:itemid', async (req: any, res: Response) => {

    const body = req.body;
    body._id = req.params.itemid;
    const items = await Item

        .find(body).exec();              // Ejecuta

    // Respuesta
    res.json({
        ok: true,
        items
    });

});


// Obtener todos los items 

itemRoutes.get('/all', async (req: any, res: Response) => {

    const items = await Item
        .find()           // Busca por id user
        .sort({ _id: -1 })    // Ordena
        .exec()               // Ejecuta

    // Respuesta    
    res.json({
        ok: true,
        items: items,

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

// Metodo para borrar items por su ID
itemRoutes.delete('/delete/:itemid', (req: any, res: Response) => {


    Item.findByIdAndRemove(req.params.itemid, req.body, (err, itemDB) => {

        if (err) throw err;

        if (!itemDB) {
            return res.json({
                ok: false,
                message: 'No existe un item con ese ID'
            });
        }

        res.json({
            ok: true,
            item: 'Item borrado con éxito'
        });


    });

});



// Método DELETE para BORRAR los items de una lista

itemRoutes.delete('/delete/items/:listid', async (req: any, res: Response) => {

    const body = req.body;
    body.list = req.params.listid;

    const items = await Item
        .find(body)
        .remove()
        .exec()

    // Respuesta
    res.json({
        ok: true,
        // page,
        items
    });

});



// Actualizar items
itemRoutes.post('/update/:listid/:itemid', (req: any, res: Response) => {

    const item = {
        title: req.body.title || req.item.title,
        description: req.body.description || req.item.description,
        preparation: req.body.preparation || req.item.preparation,
        sets: req.body.sets || req.item.sets,
        time: req.body.time || req.item.time,
        restSets: req.body.restSets || req.item.restSets,
        repeats: req.body.repeats || req.item.repeats,
        restReps: req.body.restReps || req.item.restReps,
        totalTime: req.body.totalTime,
        list: req.params.listid
    }

    Item.findByIdAndUpdate(req.params.itemid, item, { new: true }, (err, itemDB) => {

        if (err) throw err;

        if (!itemDB) {
            return res.json({
                ok: false,
                message: 'No existe un item con ese ID'
            });
        }

        res.json({
            ok: true,
            item: 'Item actualizadocon éxito'
        });


    });

});


export default itemRoutes;