require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.urlencoded({ extended: true })) // Parse x-www-form-urlencoded data

const posts = [
  {
    user_token: '12345',
    nombre: 'Jose Altuve',
    email: 'mejiasoscar1990@gmail.com',
  },
  {
    user_token: '67890',
    nombre: 'Joseito',
    email: 'jose@example.com',
  },
  {
    user_token: '1990',
    nombre: 'Oriana',
    email: 'oriana@example.com',
  },
]

app.post('/login', (req, res) => {
  // Authenticate the user

  const timestamp = Math.round(new Date().getTime() / 1000)
  const jtinumber = (timestamp / 100) * 53
  const jti = Math.round(jtinumber)

  const userToken = req.body.user_token; // Get user_token from the request body

  const username = posts.find((user) => user.user_token === userToken);

  if (!username) {
    return res.status(401).json({ error: 'User not found' });
  }

  const user = {
    name: username.nombre,
    email: username.email,
    iat: timestamp,
    jti: jti,
  }

  const accessToken = jwt.sign(user, 'Q2C1Vy7NS8AmOySxTjs5wzmqCwFFE9tCrEL4F2M8O0HuTWIK')
  res.json({ jwt: accessToken })
})

app.listen(process.env.PORT || 3000)
