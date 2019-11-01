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
  try {
    let sql = 'SELECT email, salt FROM Admin WHERE email = ?'
    let results = await currentDB.retrieve(sql, [req.body.email], 'admin')
    if (results.length !== 1) {
      throw new apiError.UserNotFoundError('User not exists')
    }

    const hashedPassword = crypto.createHash('sha256').update(req.body.password + results[0].salt).digest('base64')

    sql = 'SELECT * FROM Admin WHERE email = ? AND password = ?'
    results = await currentDB.retrieve(sql, [results[0].email, hashedPassword], 'admin')

    if (results.length === 1) {
      return res.json({
        code: 0
      })
    }
    throw new apiError.EmailOrPasswordIncorrectError()
  } catch (err) {
    errorHandler(res, err)
  }
})
