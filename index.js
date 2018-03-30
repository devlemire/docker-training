require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const massive = require('massive')

const app = express()

massive({
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   database: process.env.DB_NAME,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   ssl: false,
   poolSize: 10
})
   .then(instance => app.set('db', instance))
   .catch(err => console.error('Massive failed at connecting to the db:', err))

app.use(
   session({
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({ host: 'redis_server' }),
      resave: false,
      saveUninitialized: false
   })
)

app.use(cors())
app.use(bodyParser.json())

app.use('/api/people', require('./routers/people'))

app.use(express.static(`${__dirname}/public/build`))
app.get('*', (req, res) => {
   res.sendFile(path.resolve(`${__dirname}/public/build/index.html`))
})

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`))

module.exports = app
