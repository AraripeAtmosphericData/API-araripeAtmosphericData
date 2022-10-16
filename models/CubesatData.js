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
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("CubesatData",cubesatdata)