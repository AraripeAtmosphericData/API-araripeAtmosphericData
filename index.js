const express = require("express")
const app = express()
const mongoose = require('mongoose')

require('./models/Rank')
const CubesatData = mongoose.model("CubesatData")


//mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://hugo:96762171@blogapp.m1mhh.mongodb.net/ProjCubesat?retryWrites=true&w=majority").then(() => {
    console.log('Conectado a database no mongodb')
}).catch((err) => {
    console.log(err)
})

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/",(req,res)=>{
    res.redirect('/saveData')
})
app.get("/getInfo/:name", (req,res)=>{
    let info = req.params.name
    CubesatData.findOne({ nome: info}).then((data) => {
        res.send({
            name:data.nome,
            age:data.maiorRodada,
            email:data._id
        })
    })
})
app.post('/saveData', (req, res) => {
    let bateria = 2201
    let temperatura = 28.46352
    let pressao =91569.25
    
    const novoDado = {
                    bateria: bateria,
                    temperatura: temperatura,
                    pressao: pressao
    }

    new CubesatData(novoDado).save().then(() => {
    })
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
