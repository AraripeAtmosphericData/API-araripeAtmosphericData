const express = require("express")
const app = express()
const mongoose = require('mongoose')

require('./models/SensorData')
const SensorData = mongoose.model("SensorData")


mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://hugo:96762171@blogapp.m1mhh.mongodb.net/ProjCubesat?retryWrites=true&w=majority").then(() => {
    console.log('Conectado a database no mongodb')
}).catch((err) => {
    console.log(err)
})

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send('hi')
})
app.get("/getInfo/:identificador", (req,res)=>{
    CubesatData.find().sort({identificador:req.params.identificador,_id:-1}).limit(1).then((data) => {
        res.send(data)
    })
})
app.post('/saveData/:identificador/:bateria/:temp/:pressao/:voc/:co2', (req, res) => {
    let identificador = req.params.identificador
    let bateria = req.params.bateria
    let temperatura = req.params.temp
    let pressao = req.params.pressao
    let payload = {
        altitude: (1+1),
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
        },
        identificador:identificador
    }

    new SensorData(novoDado).save().then(() => {
        res.redirect('back');
    })
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
