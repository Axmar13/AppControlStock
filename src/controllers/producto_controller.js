const modeloProducto = require('../models/producto');

const express = require('express');
const router = express.Router();

//async y await permite que se obtengan todos los productos y luego si enviarlos como respuesta del servidor
router.get('/productos', async (request, response)=>{
    let productos = await modeloProducto.obtenerProductos();
    response.send(productos);
});

router.post('/producto', async (req, res) => {
    let producto = {
        "nombre": req.body.nombre,
        "id_categoria": req.body.categoria
    };

    let query = await modeloProducto.nuevoProducto(producto);
    if(query == 'OK'){
        res.send('Se guardó el producto.')
    }else{
        res.send('Ocurrió un error al guardar.')
    }
});

router.get('/producto/:id', async (req, res) => {
    let producto = await modeloProducto.obtenerUnProducto(req.params.id);
    res.send(producto);
})

module.exports = router;