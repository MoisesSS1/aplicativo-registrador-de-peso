const mongoose = require('mongoose')

 const Weight = mongoose.model('Weight', {
    nome: String,
    altura: Number,
    idade: Number,
    genero: String,
    dataInclusao: Date,
    IMC: Number
})


module.exports = Weight