export function InsertUser(connection, UserData, Callback) {
  let sql =
    "INSERT INTO users (First_Name, Last_Name,Email,Mobile_Number,Age,Country,gender) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      UserData.First_Name,
      UserData.Last_Name,
      UserData.Email,
      UserData.Mobile_Number,
      UserData.Age,
      UserData.Country,
      UserData.gender,
    ],
    Callback,
  );
}


export function ReadData(connection,Callback){
    let sql="SELECT * FROM users"
    connection.query(sql,Callback);
}



export function DeleteUser(connection,id,Callback){
    let sql = "DELETE FROM users WHERE id = ?";
    connection.query(sql,Callback);
}




// import mysql from 'mysql2';
// import { insertUser } from './models/mydataSchema.js';

// let sql = "INSERT INTO users (userName) VALUES ('Company Inc')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });

// export function insertUser(connection,name,callback){
//     let sql = "INSERT INTO users (userName) VALUES (?)";
//     connection.query(sql,[name], callback)
// }

// export function ReadData(connection,callback){
//     let sql = "SELECT userName FROM users";
//     connection.query(sql, callback);
// }
