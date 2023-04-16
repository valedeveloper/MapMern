// const http = require('http');

//  const server=http.createServer((req,res)=>{
//     if(req.url==="/hola"){
//         res.end("Hola, así se llama este router")
//     }
//     console.log(req.url)
//     res.end("Hola, este es mi primer servidor con http")
//  })

//  server.listen(3000)

const express = require("express"); //Importo express
const mongoose = require("mongoose"); //Importo Mongoose, librería que permite la conexión con la base de datos. 
const dotenv = require("dotenv"); //Este es un paquete que permite leer los archivos .env. Son archivos donde guardamos variables de entorno
const pinRoute=require("./routers/pin")
const userRoute=require("./routers/user")

dotenv.config(); //Pongo en funcionamiento se paquete

const app = express(); //Coloco express en una variable "app"
const URL = process.env.MONGO_URL; //Me traigo la url que está en el archivo .env. El MONGO_URL, es la variable de entorno que está en .env


mongoose
  .connect(URL, { ssl: true }) //Devuelve una promesa
  .then(() => console.log("Conect Mongo"))
  .catch((e)=>console.log(e))



  
app.use(express.json())  //Esto va a convertir el cuerpo de la request en JSON
app.use("/api/pin",pinRoute)
app.use("/api/user",userRoute)





app.listen(8000,()=>{
    console.log("Estoye escuchando en el puerto 8000")
});
