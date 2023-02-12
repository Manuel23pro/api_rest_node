const { client } = require('../database/db');

// This function creates product in the database 
const addProduct = async (req, res) => {
    try {
        const product = req.body
        // console.log(product);
        const result = await client.db("api_rest").collection("productos").insertOne(product)
        if (result) {
            res.status(201).json({
                "Status": 201,
                "Message": "Resource Created Successfully",
                "InsertedId": result.insertedId || null
            })
        } else {
            res.status(500).json(
                {
                    "Status": 500,
                    "Message": "Error",
                    "InsertedId": result.insertedId || null
                }
            )
        }
    } catch (error) {
        console.log(error.message)
    }
}

// This function lists all the data in the database
const getProducts = async (req, res) => {
    try {
        const data = await client.db("api_rest").collection("productos").find({})

        const data_result = await data.toArray();
       // console.log(data_result.length)

        if (data_result.length === 0) {
            res.status(200).json({
                "Status": 200,
                "Message":"Not Data",
                "Data": data_result.length
            })
        } if (data_result.length > 0){
            res.status(200).json(data_result)
        } 
        else {
            res.status(404).json({
                "message": "Not Found",
                "status": 404
            })
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

// this function lists a single product based on the given id 
const getProduct = async (req, res) => {
    const id = req.params.id
    console.log(id)
    const ojectID = { id: parseInt(id) }

    try {
        const data = await client.db("api_rest").collection("productos").findOne(ojectID)

            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    "Message": "Not Found",
                    "Status": 404,
                })
            }
    } catch (error) {
        console.log(error.message);
    }
}

// this function updates a product

const updateProduct =  async (req, res) =>{
    const id = parseInt(req.params.id)
    console.log(id)
    const dataUpdate = req.body
    try {
        const api_data = await client.db("api_rest").collection("productos").updateOne({id:id},{$set: dataUpdate}) 
        if(api_data){
            res.status(200).json(
                {
                "Status": 200,
                "Message": "Successfully Updated ",
                "UpdeteCount": api_data.modifiedCount || true
            })
        }else{
            res.status(404).json(
                {
                "Message": "Not Found",
                "Status": 404,
                "Params":"/param"
                }
        )
        }
    } catch (error) {
    console.log(error.message) 
    }
}

const deleteProduct = async (req, res) =>{
    const param_id = parseInt(req.params.id)
    console.log(param_id)
    try {
        const response_db = await client.db("api_rest").collection("productos").deleteOne({id:param_id}) 
        if(response_db.deletedCount === 1){
            res.status(200).json({
                "Status": 200,
                "Message": "Deleted Successfully",
                "DeletedCount": response_db.deletedCount
            })
        } else if (response_db.deletedCount === 0) {
            res.status(404).json({
                "Message": "Not Found",
                "Status": 404,
                "DeletedCount": response_db.deletedCount
            })
        } else {
            res.status(500).json({
                "Message": "Error On Server ",
                "Status": 500
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}





// aqui se esportan las funciones 
module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}