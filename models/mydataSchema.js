import mysql from 'mysql2';
// import { insertUser } from './models/mydataSchema.js';



// let sql = "INSERT INTO users (userName) VALUES ('Company Inc')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });

export function insertUser(connection,name,callback){
    let sql = "INSERT INTO users (userName) VALUES (?)";
    connection.query(sql,[name], callback) 
}

export function ReadData(connection,callback){
    let sql = "SELECT userName FROM users";
    connection.query(sql, callback);
}