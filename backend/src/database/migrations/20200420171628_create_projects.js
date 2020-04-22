
exports.up = function(knex) {

    return knex.schema.createTable('projects', (table) => {
       table.increments('project_id').primary();
       table.string('name').notNullable();
       table.string('description');
       table.integer('User_id').unsigned().notNullable();
       table.foreign('User_id').references('user_id').inTable('users')
   });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
