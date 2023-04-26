const modeloCategoria = require('../models/categoria');

const express = require('express');
const router = express.Router();

//async y await permite que se obtengan todos los Categorias y luego si enviarlos como respuesta del servidor
router.get('/categorias', async (request, response)=>{
    let categorias = await modeloCategoria.obtenerCategorias();
    response.send(categorias);
});

router.post('/categoria', async (req, res) => {
    let categoria = {
        "nombre": req.body.nombre,
    };

    let query = await modeloCategoria.nuevaCategoria(categoria);
    if(query == 'OK'){
        res.send('Se guardó la Categoria.')
    }else{
        res.send('Ocurrió un error al guardar.')
    }
});

router.get('/Categoria/:id', async (req, res) => {
    let categoria = await modeloCategoria.obtenerUnaCategoria(req.params.id);
    res.send(categoria);
})

module.exports = router;