const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./models/SensorData')
const sensordatas = mongoose.model("SensorData")


mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://hugo:96762171@blogapp.m1mhh.mongodb.net/SensorTest?retryWrites=true&w=majority").then(() => {
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
app.get("/getdata/:ind", (req,res)=>{
    let inds = parseFloat(req.params.ind)
    sensordatas.find({identificador:inds}).sort({_id:-1}).limit(1).then((data) => {
        res.send(data)
    })
})
app.post('/receberJson', function(req, res){
   
    const novoDado = {
        bateria: 0,
        temperatura: 0,
        pressao: 0,
        payload: {
            altitude: 0,
            co2: 0,
            voc: 0
        },
        identificador:0
    }
    

    new sensordatas(novoDado).save().then(() => {
        res.send("postado"); 
    })
});

app.post('/saveData/:identificador/:bateria/:temp/:pressao/:voc/:co2', (req, res) => {
    let identificador = req.params.identificador
    let bateria = req.params.bateria
    let temperatura = req.params.temp
    let pressao = req.params.pressao
    let payload = {
        altitude: (44331.5-(4946.62*(pressao**0.190263))),
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

    new sensordatas(novoDado).save().then(() => {
        res.redirect('back');
    })
})

app.listen(5000, () => {
    console.log("port 5000.");
});

module.exports = app;
