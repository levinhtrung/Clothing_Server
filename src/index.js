const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors') // bảo mật và tránh lỗi khi dùng các gmail giống nhau

require('dotenv').config() // có cái này mới lấy được thằng env

const app = express()
const port = process.env.PORT || 3001
    
app.use(cors())
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

routes(app)

async function connect() {
    try {
        await mongoose.connect(`${process.env.MONGO_DB}`)
        console.log('Connect successfully!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

connect()

// module.exports = { connect }


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})