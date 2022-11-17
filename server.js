require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./config/dbConfig')

const router = require('./routes/router');


const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/form',router)
const port = process.env.PORT||5000


// node mailer setup



app.get('/', (req, res) => res.send('Welcome to nodemailer API v2!'))
app.listen(port,()=>{
    console.log("Server live...")
})