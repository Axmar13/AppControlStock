const db = require('../../DbConect');

//Configurar la conexión a la base de datos
var modeloCategoria = {}; //Declara la variable como un objeto

//async quiere decir que va a tener una pausa
modeloCategoria.obtenerCategorias = async () => {
    let sql = "SELECT * FROM categorias";
//await provoca que si o si termine de comunicarse con la base de datos para continuar
    let categorias = await db.query(sql);
    console.log(categorias);
    return categorias;
}

modeloCategoria.nuevaCategoria = async (categoria) => {
//SET ? guarda el dato que llega después
    let sql = "INSERT INTO categorias SET ?";

    let query = await db.query(sql, categoria);
    console.log(query.insertId);

    if(query.insertId != null){
        return 'OK';
    }else{
        return 'ERROR';
    }
}

modeloCategoria.obtenerUnaCategoria = async (id) => {
    let sql = "SELECT * FROM categorias WHERE id = "+id;
    let categoria = await db.query(sql);
    console.log(categoria);
    return categoria[0];
}

module.exports = modeloCategoria;