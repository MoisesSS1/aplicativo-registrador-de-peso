const express = require('express')
const mongoose = require('mongoose')
const { engine }  = require('express-handlebars')
const Weights = require('./model/Weights')

const app = express()

const url = "mongodb+srv://patt0lino:kb23ij45@apicluster.mf7bn23.mongodb.net/bancodaapi?retryWrites=true&w=majority"

//Config json
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

//Config handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/',(req,res)=>{
    res.render('home')
})

mongoose.connect(url, ()=>{
    console.log('servidor conectado')
}).then(    
    app.listen('3000',()=>{
    console.log('Servidor rodando na porta 3000')
})).catch((err)=>console.log(err))

