const express = require('express');
const productManagerRouter = require('./routes/productManager.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const routerPadraoProdutos = '/api/products'

app.use(routerPadraoProdutos, productManagerRouter)




module.exports = app