import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2";
import { error } from "console";
import fs from "fs";
import path from "path";
import axios from "axios";
import { InsertUser } from "./models/mydataSchema.js";
import { ReadData } from "./models/mydataSchema.js";
import { DeleteUser } from "./models/mydataSchema.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.set("/views", path.join(__dirname, "/views"));

app.use("/public", express.static(path.join(__dirname, "public")));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ReemSafar66$$",
  database: "user",
});

connection.connect((error) => {
  if (error) {
    console.error("error connecting: " + error.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/ex",(req,res)=>{
  res.render("ex");
})

// GET Request

// app.get("/", (req, res) => {
//   ReadData(connection, (err, result) => {
//     if (err) throw err;
//     res.render("common", { body: "home", users: result });
//   });
// });

// app.get("/AddUser", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://restcountries.com/v3.1/all?fields=name",
//     );

//     const countriesList = response.data
//       .map((country) => country.name.common)
//       .sort();

//     res.render("common", {
//       body: "AddUser",
//       isEdit: false,
//       countries: countriesList,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.get("/Edit", (req, res) => {
//   res.render("common", { body: "Edit", isEdit: true, countries: [] });
// });

// app.get("/view", (req, res) => {
//   const userid = req.params.id;

//   const sql = "SELECT * FROM users WHERE id=?";

//   connection.query(sql, [userid], (error, result) => {
//     if (error) throw error;

//     res.render("common", { body: "view"});
//   });
// });

// //POST Request

// app.post("/AddUser", (req, res) => {
//   const UserData = {
//     First_Name: req.body.FirstName,
//     Last_Name: req.body.LastName,
//     Email: req.body.Email,
//     Mobile_Number: req.body.MobileNumber,
//     Age: req.body.Age,
//     Country: req.body.country,
//     gender: req.body.Gender,
//   };

//   console.log(req.body);

//   InsertUser(connection, UserData, function (err, result) {
//     if (err) throw err;
//     res.redirect("/AddUser");
//   });
// });

// app.get("/deleteUser/:id", (req, res) => {
//   const id = req.params.id;

//   DeleteUser(connection, id, (err, result) => {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//     res.redirect("/");
//   });
// });

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});

// connection.end();

// mongoose.connect(
//     // "mongodb+srv://lama6-66:ReemSafar66@cluster0.guhotkx.mongodb.net/?appName=Cluster0"
// )
//   .then(() => {
//      console.log("✅ MongoDB Connected");
//     app.listen(3000,()=>{
//     console.log('http://localhost:3000/');
// });
//   })

//   .catch((err)=>{
//     console.log(err);
//   })

//  ReadData(connection,(err, result)=>{
//     if (err) throw err;
//     console.log(result);

//   //  const homeContent = fs.readFileSync(path.join(__dirname, "views/home.ejs"), "utf8");

//   })

// res.sendFile('./views/home.html',{root:__dirname});

// app.post("/post",(req,res)=>{
//   console.log("im here");
//   const name=req.body.name;

//   insertUser(connection,name,(err,result)=>{
//     if(err) {
//       console.log(err);
//       throw err;
//     }
//     console.log("1 record inserted");
//     res.send("User added successfully");
//   });
// })
