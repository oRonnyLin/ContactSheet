const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const https = require('https')
const fs = require('fs')

// backend
const router = express.Router()
const generatedTokens = {}
router.post('/credential', async (req, res) => {
  console.log('request body: ', req.body)
  const { accountId, password } = req.body
  let responseBody

  if (accountId === 'ChamberMusic' && password === 'Trio123!') {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    generatedTokens[token] = new Date()
    console.log(`token generated: ${token} at ${generatedTokens[token]}`)
    responseBody = {
      token: token,
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
router.delete('/logout', async (req, res) => {
  console.log('request body: ', req.body)
  const { token } = req.body
  let responseBody
  try {
    if (generatedTokens[token]) {
      delete generatedTokens.token
      console.log(`token deleted: ${token}`)
      responseBody = {
        code: 0
      }
    }
  } catch (error) {
    responseBody = {
      code: 1
    }
  }
  return res.json(responseBody)
}
)

// used for opening another listener at diff port
// const appBackend = express()
// appBackend.use(bodyParser.json())
// appBackend.use(bodyParser.urlencoded({
//   extended: true
// }))
// appBackend.use(cors())
// appBackend.use('/', router)
// appBackend.listen(4000, () => {
//   console.log('4000 backend server started')
// })

// frontend
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
app.use(cors())
app.use('/api', router)
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
app.get('/unauthorized', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/group', async function (req, res) {
  const token = req.query.token
  console.log('[Group]token received: ', token)
  if (generatedTokens[token]) {
    res.sendFile(path.join(__dirname, 'contactSheets/group', 'index.htm'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/harp', function (req, res) {
  const token = req.query.token
  console.log('[Harp]token received: ', token)
  if (generatedTokens[token]) {
    res.sendFile(path.join(__dirname, 'contactSheets/harp', 'index.htm'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/flute', function (req, res) {
  const token = req.query.token
  console.log('[Flute]token received: ', token)
  if (generatedTokens[token]) {
    res.sendFile(path.join(__dirname, 'contactSheets/flute', 'index.htm'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})
app.get('/viola', function (req, res) {
  const token = req.query.token
  console.log('[Violin]token received: ', token)
  if (generatedTokens[token]) {
    res.sendFile(path.join(__dirname, 'contactSheets/violin', 'index.htm'))
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})

// app.listen(3000, () => {
//   console.log('3000 server has started')
// })

// reroute http to https
app.use(function (req, res, next) {
  if (!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''))
  }
  next()
})

const options = {
  key: fs.readFileSync('ssl/private.key', 'utf8'),
  cert: fs.readFileSync('ssl/certificate.crt', 'utf8'),
  ca: fs.readFileSync('ssl/ca_bundle.crt', 'utf8')
}

https.createServer(options, app).listen(443, () => console.log('https server ready at 443!'))
