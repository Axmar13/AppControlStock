const db = require('../../DbConect');

//Configurar la conexión a la base de datos
var modeloProducto = {}; //Declara la variable como un objeto

//async quiere decir que va a tener una pausa
modeloProducto.obtenerProductos = async () => {
    let sql = "SELECT * FROM productos";
//await provoca que si o si termine de comunicarse con la base de datos para continuar
    let productos = await db.query(sql);
    console.log(productos);
    return productos;
}

modeloProducto.nuevoProducto = async (producto) => {
//SET ? guarda el dato que llega después
    let sql = "INSERT INTO productos SET ?";

    let query = await db.query(sql, producto);
    console.log(query.insertId);

    if(query.insertId != null){
        return 'OK';
    }else{
        return 'ERROR';
    }
}

modeloProducto.obtenerUnProducto = async (id) => {
    let sql = "SELECT * FROM productos WHERE id = "+id;
    let producto = await db.query(sql);
    console.log(producto);
    return producto;
}

modeloProducto.obtenerProductosPorCategoria = async (id_categoria) => {
    let sql = "SELECT * FROM productos WHERE id_categoria = "+id_categoria;
//await provoca que si o si termine de comunicarse con la base de datos para continuar
    let productos = await db.query(sql);
    console.log(productos);
    return productos;
} 

module.exports = modeloProducto;