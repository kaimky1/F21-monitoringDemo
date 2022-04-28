const express = require('express')
const path = require('path')


const app = express()

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b1b35af086894f0e8e9f48585dbc5365',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545
app.listen(port, () => {
    console.log(`Take us to warp ${port}!`)
})