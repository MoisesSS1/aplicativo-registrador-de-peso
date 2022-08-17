const express = require('express')
const mongoose = require('mongoose')
const { engine }  = require('express-handlebars')
const Weights = require('./model/Weights')

const app = express()

const url = "mongodb+srv://patt0lino:kb23ij45@apicluster.mf7bn23.mongodb.net/bancodaapi?retryWrites=true&w=majority"


//pasta padrão de arquivos estáticos
app.use(express.static('public'));
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

//Criar rota get/post para cadastro de dados

app.get('/customers/create', (req,res)=>{
    res.render('createUser')
})



//criar rota get para exibir dados
app.get('/customers', async (req,res)=>{

    const data = await Weights.find({})

    res.render('customers', {data})

})

//criar get para editar dados


//criar rota post para exluir dados


//Criar rota post para salvar dados



mongoose.connect(url, ()=>{
    console.log('servidor conectado')
}).then(    
    app.listen('3000',()=>{
    console.log('Servidor rodando na porta 3000')
})).catch((err)=>console.log(err))

