// Imports
import { Router, Request, Response } from 'express';
import { User, Iuser } from '../models/user.model';
import bycrypt from 'bcrypt'
import Token from '../classes/token';
import { validateToken } from '../middlewares/authentication';


const userRoutes = Router();

// Login de usuario

userRoutes.post('/login', (req: Request, res: Response) => {

    // extraer la info del post
    const body = req.body;

    User.findOne({ email: body.email }, (err: any, userDB: Iuser) => {

        if (err) throw err;

        if (!userDB) {

            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña incorrecta'
            });
        }

        if (userDB.comparePassword(body.password)) {

            const tokenUser = Token.getJWebToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {

            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña incorrecta ***'
            });
        }
    });
});


// Creaar un usuario
userRoutes.post('/create', (req: Request, res: Response) => {

    // extraer la info del post
    const user = {

        name: req.body.name,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    User.create(user).then(userDB => {

        const tokenUser = Token.getJWebToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });

    }).catch(err => {

        res.json({
            ok: false,
            err
        });

    });

});

// Actualizar usuario
userRoutes.post('/update', validateToken, (req: any, res: Response) => {

    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar
    }

    User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {

        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJWebToken({
            _id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});

userRoutes.get('/', [validateToken], (req: any, res: Response) => {
    const user = req.user;

    res.json({
        ok: true,
        user
    });
});



// // Insertar id en array lists: de usuarios (EN PRUEBAS)
// userRoutes.post('/addlist/:iduser/:idlist', (req: Request, res: Response) => {

//     // extraer la info del post
//     const iduser = req.params.iduser;
//     const idlist = req.params.idlist;

//     User.findOne({ _id: iduser }, (err: any, userDB: Iuser) => {

//         userDB.lists.push(idlist)
//         userDB.save();

//         res.json({
//             ok: true,
//             idlist


//         });

//     });
// });
export default userRoutes;



