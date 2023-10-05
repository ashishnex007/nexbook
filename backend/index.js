const run = require('./db')
run()
const express = require("express")
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


//Routes

app.get('/',(req,res)=>{
    res.send("hello mom")
})

app.use('/api/auth',require("./routes/Auth"))
app.use('/api/notes',require("./routes/Notes"))


app.listen(port,()=>{
    console.log(`Nexbook Backend running on port ${port}`)
})