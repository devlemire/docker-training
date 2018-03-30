const express = require('express')
const router = express.Router()
const peopleController = require('../controllers/people')

router.use((req, res, next) => {
   const logObj = {
      body: req.body,
      query: req.query
   }

   console.log(`${req.method} ${req.baseUrl}`)
   console.log(logObj)
   next()
})

router.get('/', peopleController.get)
router.post('/', peopleController.post)
router.delete('/', peopleController.delete)

module.exports = router
