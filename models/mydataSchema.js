import axios from "axios";

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
    connection.query(sql,[id],Callback);
}


export function SearchUser(connection,id,Callback){
  let sql= "SELECT * FROM users WHERE id = ?";
  connection.query(sql, [id], Callback);
}


export function UpdateUser(connection, id, updatedData, Callback) {
  let sql = "UPDATE users SET ? WHERE id = ?";
  connection.query(sql, [updatedData, id], Callback);
}

export async function getCountriesList() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
        return response.data.map(country => country.name.common).sort();
    } catch (error) {
        console.error( error);
        return []; 
    }
}
