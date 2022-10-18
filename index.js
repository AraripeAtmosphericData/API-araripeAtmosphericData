const express = require("express")
const app = express()
const mongoose = require('mongoose')

require('./models/CubesatData')
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
    res.send('hi')
})
app.get("/getInfo/", (req,res)=>{
    CubesatData.find().sort({_id:-1}).limit(1).then((data) => {
        res.send(data)
    })
})
app.post('/saveData/:bateria/:temp/:pressao/:alt/:voc/:co2/:url', (req, res) => {
    
    let url = req.params.url
    let bateria = req.params.bateria
    let temperatura = req.params.temp
    let pressao = req.params.pressao
    let payload = {
        altitude: req.params.alt,
        co2: req.params.co2,
        voc: req.params.voc
    }
    
    const novoDado = {
        bateria: bateria,
        temperatura: temperatura,
        pressao: pressao,
        payload: {
            altitude: payload.altitude,
            co2: payload.co2,
            voc: payload.voc
        }
    }

    new CubesatData(novoDado).save().then(() => {
        res.redirect('url')
    })
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
