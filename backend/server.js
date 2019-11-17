const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

router.post('/login', async (req, res) => {
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

app.use('/', router)
app.use('/', express.static('build', { index: 'index.html' }))
app.use('/group', express.static('group', { index: 'index.htm' }))
app.use('/harp', express.static('harp', { index: 'index.htm' }))
app.use('/flute', express.static('flue', { index: 'index.htm' }))
app.use('/violin', express.static('violin', { index: 'index.htm' }))
app.listen(4000, () => {
  console.log('server has started')
})
