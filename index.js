const express = require('express');

const app = express();

app.get('/', (req, rest)=>{return rest.send('Inicio de servidor.')})

// CRUD

const DB = require('./DbConect.js')

app.get('/productos', (req, res)=>{
    let sql = "SELECT * FROM productos";
    DB.query(sql,(error, resultado, campos)=>{
        console.log(resultado);
        res.send(resultado[0])
    })
    return;
})

app.post('/productos', (req, res)=>{
    res.send('producto creado!')
})

app.listen(3000, ()=>{console.log("servidor en linea!")})