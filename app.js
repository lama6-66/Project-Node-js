import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';


const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));


app.get("/",(rew,res)=>{
    res.sendFile('./views/home.html',{root:__dirname});
})

app.listen(3000,()=>{
    console.log('http://localhost:3000/');
});