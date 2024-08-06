const express = require('express');
const ProductManager = require('../ProductManager');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager()
const routerPadraoProdutos = '/products'



app.get(routerPadraoProdutos, async(req, res)=>{
    let limite = parseInt(req.query.limit)
   try {
    if(limite > 0){
        const data = await productManager.filtrarQtdProduto(limite)
        res.send(data)
    }else{
        const data = await productManager.lerArquivo()
        res.send(data)
    }
   } catch (error) {
    
   }
 })

app.get(`${routerPadraoProdutos}/:pid`, async (req,res)=>{
    const id = parseInt(req.params.pid)
    const produtoEncontrado = await productManager.getProductId(id)
    res.send(produtoEncontrado)
})

module.exports = app