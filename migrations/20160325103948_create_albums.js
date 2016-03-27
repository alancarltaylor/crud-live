
exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', function(table){
    table.increments();
    table.string('artists');
    table.string('name');
    table.string('genre');
    table.boolean('explicit');
  });  
};

exports.down = function(knex, Promise) {

};
