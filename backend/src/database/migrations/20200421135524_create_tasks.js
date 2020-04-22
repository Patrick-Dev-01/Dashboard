
exports.up = function(knex) {
   return knex.schema.createTable('tasks', (table) => {
       table.increments('task_id').primary();
       table.string('title').notNullable();
       table.string('status').defaultTo('desenvolvimento');
       table.integer('Project_id').unsigned().notNullable();
       table.integer('User_Id').unsigned().notNullable();
       
       table.foreign('User_Id').references('user_id').inTable('users')
       table.foreign('Project_id').references('project_id').inTable('projects');
   });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
