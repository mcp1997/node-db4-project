const express = require('express')
const Recipe = require('./recipes-model')
const { validateRecipeID } = require('./recipes.middleware')

const router = express.Router()

router.get('/:id', validateRecipeID, (req, res) => {
  res.json('get recipe by ID')
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something went wrong in the recipes router",
    message: err.message,
    stack: err.stack
  })
})

module.exports = router