
exports.up = function(knex) {
    console.log('Created comments table')
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id')
    commentsTable.string('author').references('users.username')
    commentsTable.integer('article_id').references('articles.article_id')
    commentsTable.integer('votes')
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now())
    commentsTable.text('body').notNullable()
  })
};

exports.down = function(knex) {
  console.log('Dropped the comments table')
  return knex.schema.dropTable('comments')
};
