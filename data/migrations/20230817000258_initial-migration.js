
exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', tbl => {
      tbl.increments('recipe_id')
      tbl.timestamp('created_at').defaultTo(knex.fn.now())
      tbl.string('recipe_name', 200).notNullable().unique()
    })
    .createTable('ingredients', tbl => {
      tbl.increments('ingredient_id')
      tbl.string('ingredient_name', 200).notNullable().unique()
      tbl.string('ingredient_unit', 50)
    })
    .createTable('steps', tbl => {
      tbl.increments('step_id')
      tbl.string('step_instructions', 200).notNullable()
      tbl.integer('step_number').notNullable().unsigned()
      tbl.integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
    .createTable('step_ingredients', tbl => {
      tbl.increments('step_ingredient_id')
      tbl.float('quantity').notNullable()
      tbl.integer('step_id')
        .notNullable()
        .unsigned()
        .references('step_id')
        .inTable('steps')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      tbl.integer('ingredient_id')
        .notNullable()
        .unsigned()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')  
    })
};


exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
};
