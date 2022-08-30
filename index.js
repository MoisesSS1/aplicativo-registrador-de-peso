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


//editar dados individuais
app.get('/customer/edit/:id', async (req,res)=>{

    const _id = req.params.id
    
    const data = await Weights.find({_id:_id}).lean()
    const customer = data[0] //vem como array

    res.render('customerEdit',  customer )

})

app.post('/customer/edit/:id', async (req,res)=>{

    let _id = req.params.id
    let nome = req.body.nome
    let altura = req.body.altura
    let peso = req.body.peso
    let idade = req.body.idade
    let genero = req.body.genero

    const imc = await (peso / ((altura * altura)/10000)).toFixed(2)

    const obj = {
        _id:_id,
        nome:nome,
        altura:altura,
        peso:peso,
        idade:idade,
        genero:genero,
        imc:imc
    }

    let updateCustomer = await Weights.findOneAndUpdate({_id:_id}, obj)

    res.redirect('/customers')    
})


//criar rota post para exluir dados

app.post('/cutomer/remove/:id',(req,res)=>{
    let _id = req.params.id

    res.redirect('home')
})




app.get('/',(req,res)=>{
    res.render('home')
})

mongoose.connect(url, ()=>{
    console.log('servidor conectado')
}).then(    
    app.listen('3000',()=>{
    console.log('Servidor rodando na porta 3000')
})).catch((err)=>console.log(err))

