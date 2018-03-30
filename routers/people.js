const express = require('express')
const router = express.Router()
const peopleController = require('../controllers/people')

router.get('/', peopleController.get)
router.post('/', peopleController.post)
router.delete('/', peopleController.delete)

module.exports = router
