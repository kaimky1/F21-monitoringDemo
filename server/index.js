const express = require('express')
const path = require('path')


const app = express()
app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b1b35af086894f0e8e9f48585dbc5365',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
let students = [];
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()
    students.push(name)
    rollbar.log('Student added successfully', {author: 'Kai', type: 'manual entry'})
    res.status(200).send(students)
})



app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545
app.listen(port, () => {
    console.log(`Take us to warp ${port}!`)
})