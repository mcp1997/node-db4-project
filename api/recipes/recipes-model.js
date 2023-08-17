const db = require('../../data/db-config')

const getRecipeById = recipe_id => {
  return db('recipes as r')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('step_ingredients as si', 's.step_id', 'si.step_id')
    .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
    .select(
      'r.recipe_id',
      'r.recipe_name',
      'r.created_at',
      's.step_id',
      's.step_number',
      's.step_instructions',
      'si.ingredient_id',
      'si.quantity',
      'i.ingredient_name',
      'i.ingredient_unit'
    )
    .where('r.recipe_id', recipe_id)
    .then(recipeRows => {
      const result = {
        recipe_id: recipeRows[0].recipe_id,
        recipe_name: recipeRows[0].recipe_name,
        created_at: recipeRows[0].created_at,
        steps: recipeRows.reduce((acc, row) => {
          if(!row.ingredient_id) {
            return acc.concat({
              step_id: row.step_id,
              step_number: row.step_number,
              step_instructions: row.step_instructions,
              ingredients: []
            })
          }
          const nthIngredient = acc.find(step => row.step_instructions === step.step_instructions)
          if(!nthIngredient) {
            return acc.concat({
              step_id: row.step_id,
              step_number: row.step_number,
              step_instructions: row.step_instructions,
              ingredients: [
                {
                  ingredient_id: row.ingredient_id,
                  ingredient_name: row.ingredient_name,
                  ingredient_unit: row.ingredient_unit,
                  quantity: row.quantity
                }
              ]
            })
          }
          nthIngredient.ingredients.push({
            ingredient_id: row.ingredient_id,
            ingredient_name: row.ingredient_name,
            ingredient_unit: row.ingredient_unit,
            quantity: row.quantity
          })
          return acc
        }, [])
      }
      return result
    })
}

module.exports = { getRecipeById }