const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri_conexion = process.env.MONGODB_URI;

const client = new MongoClient(uri_conexion);


const maindb = async (client) => {
    try {
        await client.conect()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    client
}

