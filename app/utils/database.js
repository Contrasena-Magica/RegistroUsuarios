
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'chiwilangas',
    database: 'admin_dashboard'
})

export function query(queryString, callback) {
    pool.getConnection((error, connection) => {
        if(error){
            console.error('Error establishing database connection:', error);
            callback(error, null);
            return;
        }

        connection.query(queryString, (err, results) => {
            connection.release();

            if(err){
                console.error('Error executing database query:', err);
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    });
}

//module.exports = {
 //   query
//}