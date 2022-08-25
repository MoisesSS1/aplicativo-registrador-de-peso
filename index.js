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



//Criar rota get/post para cadastro de dados
app.get('/customers/create', (req,res)=>{
    res.render('createUser')
})

app.post('/customers/create', async (req,res)=>{
    
    const nome = req.body.nome
    const altura = req.body.altura
    const peso = req.body.peso
    const idade = req.body.idade 
    const genero = req.body.genero 
    let dataInclusao = req.body.dataInclusao 
    const imc = (peso / ((altura * altura)/10000)).toFixed(2)

    let date = new Date()

    if(dataInclusao==""){
        dataInclusao = date
    }

    const data = {
        nome:nome,
        altura:altura,
        peso:peso,
        idade:idade,
        genero:genero,
        dataInclusao:dataInclusao,
        imc:imc
    }

    try{
        
    console.log(data)
    await Weights.create(data)
    res.redirect('/')


    }catch(error){
        res.status(500).console.log(error)
    }

})



//criar rota get para exibir dados
app.get('/customers', async (req,res)=>{

    const data = await Weights.find().lean()
    res.render('customers', {data})
})


//criar get para editar dados individuais
app.get('/costumer/edit/:id',(req,res)=>{

    res.render('customerEdit')

})


//criar rota post para exluir dados


//Criar rota post para salvar dados


app.get('/',(req,res)=>{
    res.render('home')
})

mongoose.connect(url, ()=>{
    console.log('servidor conectado')
}).then(    
    app.listen('3000',()=>{
    console.log('Servidor rodando na porta 3000')
})).catch((err)=>console.log(err))

