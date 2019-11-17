const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

const router = express.Router()

router.post('/credential', async (req, res) => {
  console.log('request body: ', req.body)
  const { accountId, password } = req.body
  let responseBody
  if (accountId === 'Ronny' && password === '123') {
    responseBody = {
      isLoggedin: true,
      code: 0
    }
  } else {
    responseBody = {
      code: 1
    }
  }
  return res.json(responseBody)
}
)
const appBackend = express()
appBackend.use(bodyParser.json())
appBackend.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
appBackend.use(cors())
appBackend.use('/', router)
// app.use('/', express.static('build', { index: 'index.html' }))
// app.use('/login', express.static('build', { index: 'index.html' }))
// app.use('/menu', express.static('build', { index: 'index.html' }))
// app.use('/group', express.static('contactSheets/group', { index: 'index.htm' }))
// app.use('/harp', express.static('contactSheets/harp', { index: 'index.htm' }))
// app.use('/flute', express.static('contactSheets/flute', { index: 'index.htm' }))
// app.use('/violin', express.static('contactSheets/violin', { index: 'index.htm' }))

app.use(express.static(path.join(__dirname, 'build')))
app.use('/*photos', express.static(path.join(__dirname, 'photos')))
app.use('/*scripts', express.static(path.join(__dirname, 'scripts')))
app.use('/*theme', express.static(path.join(__dirname, 'theme')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/menu', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/group', async function (req, res) {
  const token = req.query.token
  console.log('[Group]token received: ', token)
  if (token === '123') {
    res.sendFile(path.join(__dirname, 'contactSheets/group', 'index.htm'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/harp', function (req, res) {
  const token = req.query.token
  console.log('[Harp]token received: ', token)
  if (token === '123') {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/flute', function (req, res) {
  const token = req.query.token
  console.log('[Flute]token received: ', token)
  if (token === '123') {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/violin', function (req, res) {
  const token = req.query.token
  console.log('[Violin]token received: ', token)
  if (token === '123') {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
appBackend.listen(4000, () => {
  console.log('backend server started')
})
app.listen(3000, () => {
  console.log('server has started')
})
