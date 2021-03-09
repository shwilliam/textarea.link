exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.string('id', 255).notNullable()
    table.string('title', 255)
    table.text('body')
    table.string('password', 255).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
