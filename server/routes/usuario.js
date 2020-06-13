const express = require('express')

const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express()


app.get('/usuario', function(req, res) {
    //res.json('get Usuario LOCAL');

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email reole estado google img')
        .skip(desde) //paginas
        .limit(limite) //maximo numeros a extraer
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        })


});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });



    /*if (body.nombre === undefined) {
        res.status(400).json({
            Ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }*/
});

app.put('/usuario/:id', function(req, res) {
    //actualizacion de registros

    let id = req.params.id;
    //Areglo de datos que si se pueden actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

    //res.json('put Usuario');
});

app.delete('/usuario/:id', function(req, res) {
    //res.json('delete Usuario');

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, }, (err, usuariodelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuariodelete
        })
    });
    /*Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });*/



});

module.exports = app;