/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description');
    table.integer('priority').notNullable();
    table.boolean('done').defaultTo(false).notNullable();
    table.datetime('date').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
