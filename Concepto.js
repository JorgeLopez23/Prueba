import mysql from 'mysql';

const dbConfig = {
    host: 'pruebabd.cpokqowou7pv.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'JYAnicito23$',
    database: 'Prueba',
};

let connection;

function getConnection() {
    if (!connection) {
        connection = mysql.createConnection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                throw err;
            }
        });
    }
    return connection;
}

export const handler = async (event) => {
    const conn = getConnection();

    return new Promise((resolve, reject) => {
        if (event.type === 'create') {
            const { producto, precio, cantidad } = event.data;
            const query = 'INSERT INTO productos (producto, precio, cantidad) VALUES (?, ?, ?)';
            conn.query(query, [producto, precio, cantidad], (err, results) => {
                if (err) {
                    console.error('Error al crear producto:', err);
                    reject({
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ error: 'Error al crear producto' }),
                    });
                } else {
                    resolve({
                        statusCode: 201,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ 
                            message: 'Producto creado con éxito',
                            id: results.insertId // Agregado para devolver el id generado
                        }),
                    });
                }
            });
        } else if (event.type === 'read') {
            const { id } = event.data; // Asegúrate de usar el id proporcionado para la consulta
            let query = 'SELECT * FROM productos';
            if (id) {
                query += ' WHERE id = ?';
            }
            conn.query(query, id ? [id] : [], (err, results) => {
                if (err) {
                    console.error('Error al obtener productos:', err);
                    reject({
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ error: 'Error al obtener productos' }),
                    });
                } else {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: results, // Enviando el objeto directamente
                    });
                }
            });
        } else if (event.type === 'update') {
            const { id, producto, precio, cantidad } = event.data;
            const query = 'UPDATE productos SET producto = ?, precio = ?, cantidad = ? WHERE id = ?';
            conn.query(query, [producto, precio, cantidad, id], (err, results) => {
                if (err) {
                    console.error('Error al actualizar producto:', err);
                    reject({
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ error: 'Error al actualizar producto' }),
                    });
                } else {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ message: 'Producto actualizado con éxito' }),
                    });
                }
            });
        } else if (event.type === 'delete') {
            const { id } = event.data;
            const query = 'DELETE FROM productos WHERE id = ?';
            conn.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error al eliminar producto:', err);
                    reject({
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ error: 'Error al eliminar producto' }),
                    });
                } else {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({ message: 'Producto eliminado con éxito' }),
                    });
                }
            });
        } else {
            resolve({
                statusCode: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ error: 'Method not allowed' }),
            });
        }
    });
};
