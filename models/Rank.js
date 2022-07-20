const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const rank = new Schema({
    nome: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    maiorRodada:{
        type: Number,
        require:true
    }
})

mongoose.model("Rank",rank)