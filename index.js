const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superadmin:poison143@cluster0.ajr0r.mongodb.net/sample_data?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('Library')
    booksCollection = db.collection('books')
}
connect()


app.post('/books', async (req, res) => {

    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImageurl  = req.body.imageurl


    let newBooks = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        imageurl : newImageurl
    }
    let booksID = 0

    const result = await booksCollection.insertOne(newBooks)
    booksID = result.insertedId

    res.status(201).json(booksID)
})


const port = 3000
app.listen(port,  () => console.log(`Server started at ${port}`))


11fgtsregft
