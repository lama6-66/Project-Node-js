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
import { SearchUser } from "./models/mydataSchema.js";
import { UpdateUser } from "./models/mydataSchema.js";
import { getCountriesList } from "./models/mydataSchema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.set("/views", path.join(__dirname, "/views"));

app.use("/public", express.static(path.join(__dirname, "public")));

var connection = mysql.createConnection({
  host: process.env.DB_Host,
        user: process.env.DB_User,
        password: process.env.DB_Password,
        port:parseInt(process.env.DB_Port) ,
        database: process.env.DB_Name,
         ssl:{
            rejectUnauthorized: false
        }
});

connection.connect((error) => {
  if (error) {
    console.error("error connecting: " + error.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// GET Request

app.get("/", (req, res) => {
  ReadData(connection, (err, result) => {
    if (err) throw err;
    res.render("common", { body: "home", users: result });
  });
});

app.get("/AddUser", async (req, res) => {
  try {
    const countries = await getCountriesList();

    res.render("common", {
      body: "AddUser",
      isEdit: false,
      countries: countries,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/Edit",async (req, res) => {
  const countries = await getCountriesList();
  res.render("common", { body: "Edit", isEdit: true, countries: countries });
});

app.get("/view", (req, res) => {
  const userid = req.params.id;

  const sql = "SELECT * FROM users WHERE id=?";

  connection.query(sql, [userid], (error, result) => {
    if (error) throw error;

    res.render("common", { body: "view"});
  });
});

//POST Request

app.post("/AddUser", (req, res) => {
  const UserData = {
    id: req.body.id,
    First_Name: req.body.FirstName,
    Last_Name: req.body.LastName,
    Email: req.body.Email,
    Mobile_Number: req.body.MobileNumber,
    Age: req.body.Age,
    Country: req.body.country,
    gender: req.body.Gender,
  };

  console.log(req.body);

  InsertUser(connection, UserData, function (err, result) {
    if (err) throw err;
    res.redirect("/AddUser");
  });
});

app.get("/edit/:id", async (req, res) => {
  const userid = req.params.id;
  const countries = await getCountriesList();
  SearchUser(connection,userid,(err,result)=>{
    if(err) throw err;
    res.render("common", { body: "Edit", isEdit: true, countries: countries, user: result[0] });
})
});

app.post("/update/:id", (req, res) => {
  const userid = req.params.id;
  const updatedData = {
    First_Name: req.body.FirstName,
    Last_Name: req.body.LastName, 
    Email: req.body.Email,
    Mobile_Number: req.body.MobileNumber,
    Age: req.body.Age,
    Country: req.body.country,
    gender: req.body.Gender
  }
  UpdateUser(connection, userid, updatedData, (err, result) => {
    if (err) throw err;
    console.log("Number of records updated: " + result.affectedRows);
    res.redirect("/");
  });
  });

app.post("/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  DeleteUser(connection, id, (err, result) => {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
