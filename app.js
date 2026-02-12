import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import mysql from 'mysql2';
import { error } from 'console';
import { insertUser } from './models/mydataSchema.js';
import { ReadData } from './models/mydataSchema.js';


const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));


app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"))





var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ReemSafar66$$',
  database : 'user'
});
 
connection.connect((error)=>{
  if (error) {
    console.error('error connecting: ' + error.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get("/",(req,res)=>{

  ReadData(connection,(err, result)=>{
    if (err) throw err;
    console.log(result);

    res.render("home",{
      username:result[0].userName
    })
  })
   
  // res.sendFile('./views/home.html',{root:__dirname});
  
})
 

app.post("/post",(req,res)=>{
  console.log("im here");
  const name=req.body.name;

  insertUser(connection,name,(err,result)=>{
    if(err) {
      console.log(err);
      throw err;
    }
    console.log("1 record inserted");
    res.send("User added successfully");
  });
})


app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
})


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