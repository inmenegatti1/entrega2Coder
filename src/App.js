const express = require('express');
const ProductManager = require('../ProductManager');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager()
const routerPadraoProdutos = '/api/products'



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

let arrayProdutos = []
app.post(`${routerPadraoProdutos}`, async(req, res)=>{
    const produto = req.body
    if(!produto.status){
        produto.status = true
    }
    const produtoAprovadoCampos = productManager.verificarCamposObrigatorios(produto)
    if(produtoAprovadoCampos){
        produto.thumbnails = []
        arrayProdutos.push(produto)
        productManager.addProduct(produto)
        res.send({status:'sucesso', message: 'produto adicionado'})
    }
})


app.put(`${routerPadraoProdutos}/:pid`, async(req, res) =>{
    const id = parseInt(req.params.pid)
    const produto = req.body
    productManager.updateProducts(id, produto)
    res.send({ status: 'sucesso', message: 'Produto atualizado' });
})


app.delete(`${routerPadraoProdutos}/:pid`, async(req, res) =>{
    const id = parseInt(req.params.pid)
    productManager.deleteProduct(id)
} )

module.exports = app