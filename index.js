//Trae la libreria express
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()    

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))   //desencripta los datos

//HANDLEBARS - MOTOR DE PLANTILLAS
app.set('views', path.join(__dirname, '/views'))

app.engine('.hbs', 
    exphbs.engine({
        layoutsDir: path.join(app.get('views'), 'layouts'),
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    }))

app.set('view engine', '.hbs')

// ROUTER
app.use('/', require('./src/controllers/paginas_controller'))
app.use('/api', require('./src/controllers/producto_controller'))
app.use('/api', require('./src/controllers/categoria_controller'))

app.listen(3000, ()=>{console.log("servidor en linea!")})