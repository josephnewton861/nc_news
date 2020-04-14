
exports.up = function(knex) {
  console.log('created articles table')
  return knex.schema.createTable('articles', (articlesTable) => {
      articlesTable.increments('article_id')
      articlesTable.string('title').notNullable()
      articlesTable.text('body').notNullable()
      articlesTable.integer('votes')
      articlesTable.string('topic').references("topics.slug")
      articlesTable.string('author').references("users.username")
      articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    console.log('dropped articles table')
    return knex.schema.dropTable('articles')
};
