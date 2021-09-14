const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    solo:{
        type: String,
        require: true
    },
    familia:{
        type: String,
        require: true
    },
    imagem:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Planta", plantaSchema)