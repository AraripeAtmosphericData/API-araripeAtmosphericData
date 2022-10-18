const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cubesatdata = new Schema({
    bateria: {
        type: Number,
        require: true
    },
    temperatura: {
        type: Number,
        require: true
    },
    pressao: {
        type: Number,
        require: true
    },
    giroscopio: {
        x: Number,
        y:  Number,
        z: Number
      },
      acelerometro: {
        x: Number,
        y:  Number,
        z: Number
      },
      payload: {
        altitude: Number,
        co2:  Number,
        voc: Number
      }, 
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("CubesatData",cubesatdata)