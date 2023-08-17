const db = require('../../data/db-config')

const validateRecipeID = (req, res, next) => {
  db('recipes').where('recipe_id', req.params.recipe_id).first()
    .then(exists => {
      console.log(exists)
      if(!exists) {
        next({
          message: `recipe with recipe_id ${req.params.recipe_id} not found`
        })
      } else {
        next()
      }
    })
    .catch(next)
}

module.exports = { validateRecipeID }