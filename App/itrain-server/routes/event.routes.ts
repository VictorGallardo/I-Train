import { Event } from '../models/event.model';
import { Router, Response } from 'express'
import { validateToken } from '../middlewares/authentication';



const eventRoutes = Router();

// Obtener eventos

eventRoutes.get('/', [validateToken], async (req: any, res: Response) => {


    const body = req.body;
    body.user = req.user._id;

    const events = await Event
        .find(body)           // Busca por id user
        .sort({ _id: -1 })    // Ordena
        .exec()               // Ejecuta

    // Respuesta    
    res.json({
        ok: true,
        events,

    });

});

// Crear eventos

eventRoutes.post('/', [validateToken], (req: any, res: Response) => {

    // Insercción
    // Con el body parser obtenemos toda la información que la persona manda
    const body = req.body;
    body.user = req.user._id;
    body._id = req.body._id

    // Grabar en la base de datos
    Event.create(body).then(async eventDB => {

        // Aqui el registro ya se ha creado en la DB
        // ---------------------------------------------------------------
        // Esto es para que llene el usuario con toda su info
        // El -password no muestra la contraseña
        await eventDB.populate('user', '-password').execPopulate();
        // listDB.items.push({ lists: 'kskdkks' })
        // await listDB.save();

        res.json({
            ok: true,
            event: eventDB

        });

    }).catch(err => { // Si sucede algún error
        res.json(err)
    });
});

export default eventRoutes;