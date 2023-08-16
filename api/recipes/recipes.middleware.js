const Recipe = require('./recipes-model')

const validateRecipeID = (req, res, next) => {
  console.log('validate ID middleware')
  next()
}

module.exports = { validateRecipeID }