const mongoose = require('mongoose')

 const Weight = mongoose.model('Weight', {
    nome: String,
    altura: Number,
    peso: Number,
    idade: Number,
    genero: String,
    dataInclusao: Date,
    imc: Number
})


module.exports = Weight