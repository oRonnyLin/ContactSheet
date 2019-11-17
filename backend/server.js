const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
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
app.use('/', express.static('build', { index: 'index.html' }))
app.use('/login', express.static('build', { index: 'index.html' }))
app.use('/menu', express.static('build', { index: 'index.html' }))
app.use('/group', express.static('contactSheet/group', { index: 'index.htm' }))
app.use('/harp', express.static('contactSheet/harp', { index: 'index.htm' }))
app.use('/flute', express.static('contactSheet/flute', { index: 'index.htm' }))
app.use('/violin', express.static('contactSheet/violin', { index: 'index.htm' }))
appBackend.listen(4000, () => {
  console.log('backend server started')
})
app.listen(3000, () => {
  console.log('server has started')
})
