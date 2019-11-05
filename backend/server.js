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
  return res.json({
    isLoggedin: true,
    code: 0
  })
})

app.use('/', router)
app.use('/group', express.static('contactSheets/group', { index: 'index.htm' }))
app.listen(4000, () => {
  console.log('server has started')
})
