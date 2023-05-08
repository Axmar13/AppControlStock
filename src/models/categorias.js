const db = require('../../DbConect');
const modeloProductos = require('./productos')

//Configurar la conexión a la base de datos
var modeloCategoria = {}; //Declara la variable como un objeto

//async quiere decir que va a tener una pausa
modeloCategoria.obtenerCategorias = async () => {
    let sql = "SELECT * FROM categorias"
//await provoca que si o si termine de comunicarse con la base de datos para continuar
    let categorias = await db.query(sql)

    for (let i = 0; i < categorias.length; i++) {
        var productos = await modeloProductos.obtenerProductosPorCategoria(categorias[i].id)
        categorias[i].productos = productos
    }

    console.log(categorias)
    return categorias
}

modeloCategoria.nuevaCategoria = async (categoria) => {
//SET ? guarda el dato que llega después
    let sql = "INSERT INTO categorias SET ?"

    let query = await db.query(sql, categoria)
    console.log(query.insertId)

    if(query.insertId != null){
        return 'OK'
    }else{
        return 'ERROR'
    }
}

modeloCategoria.detalleCategoria = async (id) =>{
    let sql = "SELECT c.nombre 'categoria', p.nombre 'producto', p.id 'id' FROM categorias c, productos p WHERE p.id_categoria = c.id AND c.id = "+id
    let categorias = await db.query(sql)

    //var productos = await modeloProductos.obtenerProductosPorCategoria(id)
    //categorias.productos = productos

    console.log(categorias)
    return categorias
}

modeloCategoria.obtenerUnaCategoria = async (id) => {
    let sql = "SELECT * FROM categorias WHERE id = "+id
    let categoria = await db.query(sql)
    console.log(categoria)
    return categoria[0]
}

modeloCategoria.eliminarCategoria = async (id, nombre) => {
    let sql = "DELETE FROM categorias WHERE id = "+id
    let categoria = await db.query(sql)
    if(categoria['affectedRows'] > 0){
        return true
    }else{
        return false
    }
}

modeloCategoria.editarCategoria = async (id, nombre) => {
    let sql = "UPDATE categorias SET nombre = '"+nombre+"' WHERE id = "+id
    let categoria = await db.query(sql, {nombre, id})
    if(categoria['affectedRows'] > 0){
        return true
    }else{
        return false
    }
}

module.exports = modeloCategoria;