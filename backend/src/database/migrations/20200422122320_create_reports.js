
exports.up = function(knex) {
    

   return knex.schema.createTable('reports', (table) => {
       table.increments('report_id').primary();
       table.string('report').notNullable();
       table.integer('complete').notNullable();
       table.integer('development').notNullable();
       table.integer('stoped').notNullable();
       table.integer('Project_Id').unsigned().notNullable();
       table.integer('User_ID').unsigned().notNullable();
       table.datetime('created_at').defaultTo(knex.fn.now()).notNullable();

       table.foreign('Project_Id').references('project_id').inTable('projects');
       table.foreign('User_ID').references('user_id').inTable('users');
   })
};

exports.down = function(knex) {
  return knex.schema.dropTable('reports');
};
