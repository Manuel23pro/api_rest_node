const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const { addProduct,getProducts, getProduct, updateProduct, deleteProduct} = require('../funciones/peticiones')



const app = express()

// midelware
app.use(morgan('dev'))
app.use(express.json())
//=====================
// rutas de la API
app.get('/api/v1/products',getProducts)
app.get('/api/v1/products/:id', getProduct)
app.post('/api/v1/products',addProduct)
app.put('/api/v1/products/:id',updateProduct)
app.delete('/api/v1/products/:id',deleteProduct)







// este condigo se asigna un puerto al servidor 
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Server On Port ${process.env.PORT}`)
})
