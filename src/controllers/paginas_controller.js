const router = require('express').Router()
const modeloCategoria = require('../models/categorias')
const modeloProducto = require('../models/productos');


router.get('/home', (req, res) =>{
    res.render('home')
})

router.get('/categorias', async (req, res) =>{
    let categorias = await modeloCategoria.obtenerCategorias();
    res.render('categorias', {categorias:categorias})
})

router.get('/productos', async (req, res) =>{
    let productos = await modeloProducto.obtenerProductos();
    res.render('productos', {productos:productos})
})

router.get('/DetalleCategoria/:id', async (req, res) =>{
    let categoria = await modeloCategoria.detalleCategoria(req.params.id)
    res.render('detalleCategoria', {categoria})
})

router.get('/editarCategoria/:id', async (req, res)=>{
    let categoria = await modeloCategoria.obtenerUnaCategoria(req.params.id)
    res.render('editarCategoria', {categoria})
})

router.post('/editarCategoria/:id', async (req, res)=>{
    await modeloCategoria.editarCategoria(req.params.id, req.body.nombre)
    res.redirect('/categorias')
})

router.get('/nuevaCategoria', async (req, res) =>{
    res.render('nuevaCategoria')
})

router.post('/eliminarCategoria/:id', async (req, res) =>{
    await modeloCategoria.eliminarCategoria(req.params.id)
    res.redirect('/categorias')
})

router.post('/nuevaCategoria', async (req, res) =>{
    let categoria = {
        nombre:req.body.nombre
    }
    await modeloCategoria.nuevaCategoria(categoria)
    res.redirect('/categorias')
})

module.exports = router;