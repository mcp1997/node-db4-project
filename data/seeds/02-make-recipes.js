const recipes = [
  { recipe_name: 'Rice a Roni' },
  { recipe_name: 'Hamburger' },
  { recipe_name: 'Spaghetti' },
]

const ingredients = [
  { ingredient_name: 'Chicken', ingredient_unit: 'lbs' },
  { ingredient_name: 'Box of Rice a Roni', ingredient_unit: 'boxes' },
  { ingredient_name: 'Beef', ingredient_unit: 'lbs' },
  { ingredient_name: 'Spaghetti Noodles', ingredient_unit: 'oz' },
  { ingredient_name: 'Tomato Sauce', ingredient_unit: 'oz' },
  { ingredient_name: 'Olive Oil', ingredient_unit: 'tbsp' }
]

const steps = [
  // Rice a Roni
  { step_instructions: 'Cook Rice a Roni per instructions on box', step_number: 1, recipe_id: 1 },
  { step_instructions: 'Add olive oil to small pan, then pan-fry chicken until cooked through, then add to cooked Rice a Roni', step_number: 2, recipe_id: 1 },
  // Hamburger
  { step_instructions: 'Shape beef into patty and grill as desired', step_number: 1, recipe_id: 2 },
  { step_instructions: 'Add your favorite condiments and a bun', step_number: 2, recipe_id: 2 },
  // Spaghetti
  { step_instructions: 'Boil noodles', step_number: 1, recipe_id: 3 },
  { step_instructions: 'Add olive oil to a saucepan and set heat to medium, then cook beef until browned', step_number: 2, recipe_id: 3 },
  { step_instructions: 'Add tomato sauce and simmer on low heat for 15 minutes, then enjoy with noodles!', step_number: 3, recipe_id: 3 },
]

const step_ingredients = [
  // Rice a Roni
  { step_id: 1, ingredient_id: 2, quantity: 1 },
  { step_id: 2, ingredient_id: 1, quantity: 1.5 },
  { step_id: 2, ingredient_id: 6, quantity: 1 },
  // Hamburger
  { step_id: 3, ingredient_id: 3, quantity: 0.5 },
  // Spaghetti
  { step_id: 5, ingredient_id: 4, quantity: 16 },
  { step_id: 6, ingredient_id: 6, quantity: 2 },
  { step_id: 6, ingredient_id: 3, quantity: 2 },
  { step_id: 7, ingredient_id: 5, quantity: 12 },
]

exports.seed = async function (knex) {
  await knex('recipes').insert(recipes)
  await knex('ingredients').insert(ingredients)
  await knex('steps').insert(steps)
  await knex('step_ingredients').insert(step_ingredients)
}