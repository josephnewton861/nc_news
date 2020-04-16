process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')
const chai = require('chai')
const {expect} = chai
const chaiSorted = require('chai-sorted')
chai.use(chaiSorted)

beforeEach(() => {
    return connection.seed.run()
})


describe('app', () => {
    after(() => {
       return connection.destroy()
    })

    describe('/api', () => {
        describe('INVALID PATHS', () => {
            it('status: 404 When user inputs an invalid path', () => {
                return request(app).get('/api/invalid')
                .expect(404)
                .then(({body: {msg}}) => [
                    expect(msg).to.equal('Path not found')
                ])
            })
            describe('/topics', () => {
                describe('GET', () => {
                    it('status: 200 responds with an array', () => {
                        return request(app).get('/api/topics')
                        .expect(200)
                        .then(({body: {topics}}) => {
                            expect(topics).to.be.an('array') 
                        })
                    })
                    it('status: 200 responds with an array of topic objects that containin the correct properties', () => {
                        return request(app).get('/api/topics')
                        .expect(200)
                        .then(({body: {topics}}) => {
                            topics.forEach((topic) => {
                                expect(topic).to.contain.keys(
                                    'description',
                                    'slug'
                                    )
                                }) 
                            })
                        })
                    it('status: 405 Invalid method used', () => {
                        const invalidMethods = ['patch', 'post', 'delete', 'put']
                        const methodPromise = invalidMethods.map((method) => {
                            return request(app)[method]('/api/topics')
                            .expect(405)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Invalid method used')
                            })
                        })
                        return Promise.all(methodPromise)
                    })
                })
            })
            describe('/users', () => {
                describe('/:username', () => {
                    it('status: 405 Invalid method has been inputted', () => {
                        const invalidMethods = ['patch', 'post', 'delete', 'put']
                        const methodPromise = invalidMethods.map((method) => {
                            return request(app)[method]('/api/users/tickle222')
                            .expect(405)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Invalid method used')     
                            })
                        })
                        return Promise.all(methodPromise)
                    })
                    describe('GET', () => {
                        it('status: 200 Responds with an user object', () => {
                            return request(app).get('/api/users/butter_bridge')
                            .expect(200)
                            .then(({body: {user}}) => {
                                expect(user).to.be.an('object')
                            })
                        })
                        it('status: 200 Responds with an user object containing the correct properties', () => {
                            return request(app).get('/api/users/butter_bridge')
                            .expect(200)
                            .then(({body: {user}}) => {
                                expect(user).to.contain.keys(
                                    'username',
                                    'name',
                                    'avatar_url'
                                )
                            })
                        })
                        it('status: 404 valid input but username searched for does not exist in db', () => {
                            return request(app).get('/api/users/coder1000')
                            .expect(404)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('username coder1000 does not exist in database')
                            })
                        })
                    })
                })
            })
            describe('/articles', () => {
                describe('GET', () => {
                    it('status: 200 Responds with an array of articles', () => {
                        return request(app).get('/api/articles')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            expect(articles).to.be.an('array')
                        })
                    })
                    it('status: 200 Responds with an array of article objects containing the correct properties', () => {
                        return request(app).get('/api/articles')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            articles.forEach(article => {
                                expect(article).to.contain.keys(
                                    'author',
                                    'title',
                                    'article_id',
                                    'topic',
                                    'created_at',
                                    'votes',
                                    'comment_count'
                                )
                            })
                        })
                    })
                    it('status: 200 Able to accept a sort_by query defaulted to date', () => {
                        return request(app).get('/api/articles')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            expect(articles).to.be.ascendingBy('created_at')
                        })
                    })
                    it('status: 200 Able to accept a sort_by query different to the default and an order query', () => {
                        return request(app).get('/api/articles?sort_by=title&order=asc')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            expect(articles).to.be.ascendingBy('title')
                        })
                    }) 
                    it('status: 200 Able to accept an author query', () => {
                        return request(app).get("/api/articles?author=rogersop")
                          .expect(200)
                          .then(({body: {articles}}) => {
                            expect(articles[0].author).to.equal("rogersop");
                          });
                      });
                    it('status: 200 Able to accept an author query', () => {
                        return request(app).get("/api/articles?topic=mitch")
                          .expect(200)
                          .then(({body: {articles}}) => {
                            expect(articles[0].topic).to.equal("mitch");
                          });
                      });
                    it('status: 400 Invalid sort_by input of a column that does not exist on db', () => {
                        return request(app).get('/api/articles?sort_by=invalid')
                        .expect(400)
                        .then(({body: {msg}}) => {
                            expect(msg).to.equal('Bad request')
                        })
                    })
                    it('status: 405 Invalid method inputted by user', () => {
                        const invalidMethods = ['post', 'delete', 'patch', 'put']
                        const methodPromise = invalidMethods.map((method) => {
                            return request(app)[method]('/api/articles')
                            .expect(405)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Invalid method used')
                            })
                        })
                        return Promise.all(methodPromise)
                    })
                })
                describe.only('/:article_id', () => {
                    it('status: 405 Invalid method inputted', () => {
                       const invalidMethods = ['delete', 'put', 'post'] 
                       const methodPromise = invalidMethods.map((method) => {
                        return request(app)[method]('/api/articles/1')
                        .expect(405)
                        .then(({body: {msg}}) => {
                            expect(msg).to.equal('Invalid method used')
                        })
                       })
                       return Promise.all(methodPromise)
                    })
                    describe('GET', () => {
                        it('status: 200 responds with an object', () => {
                            return request(app).get('/api/articles/1')
                            .expect(200)
                            .then(({body: {articles}}) => {
                                expect(articles).to.be.an('object')
                            })
                        })
                        it('status: 200 responds with the correct properties', () => {
                            return request(app).get('/api/articles/1')
                            .expect(200)
                            .then(({body: {articles}}) => {
                                expect(articles).to.contain.keys(
                                    'author',
                                    'title',
                                    'article_id',
                                    'topic',
                                    'created_at',
                                    'votes',
                                    'comment_count'
                                )
                            })
                        })
                        it('status: 200 responds with a comment count of 13', ()=> {
                            return request(app).get('/api/articles/1')
                            .expect(200)
                            .then(({body: {articles}}) => {
                                expect(articles.comment_count).to.equal('13')
                            })
                        })
                        it('status: 404 Id is valid but does not exist in db', () => {
                            return request(app).get('/api/articles/1000')
                            .expect(404)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('id 1000 does not exist in database')
                            })
                        })
                        it('status: 400 Invalid datatype for article_id', () => {
                            return request(app).get('/api/articles/invalid')
                            .expect(400)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Bad request')
                            })
                        })
                    })
                    describe('PATCH', () => {
                        it('status 200: Returns an updated article object with the votes property increased by 1', () => {
                            return request(app).patch('/api/articles/1')
                            .send({inc_votes: 1})
                            .expect(200)
                            .then(({body: {article}}) => {
                                expect(article.votes).to.equal(1)
                            })
                        })
                        it('status: 200 Returns an updated article object with the votes property increased by 100', () => {
                            return request(app).patch('/api/articles/1')
                            .send({inc_votes: 100})
                            .expect(200)
                            .then(({body: {article}}) => {
                                expect(article.votes).to.equal(100)
                            })
                        })
                        it('status: 200 updated article object contains the correct keys', () => {
                            return request(app).patch('/api/articles/1')
                            .send({inc_votes: 10})
                            .expect(200)
                            .then(({body: {article}}) => {
                                expect(article).to.contain.keys(
                                    'article_id',
                                    'title',
                                    'body',
                                    'votes',
                                    'topic',
                                    'author',
                                    'created_at'
                                )
                            })


                        })
                        it('status 404: valid input however article_id inputted does not exist in db', () => {
                            return request(app).patch('/api/articles/1000')
                            .send({inc_votes: 1})
                            .expect(404)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('article_id 1000 does not exist in database')
                            })
                        })
                        it('status 400: Invalid datatype has been inputted to increment votes', () => {
                            return request(app).patch('/api/articles/1')
                            .send({inc_votes: 'invalid'})
                            .expect(400)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Bad request')
                            })
                        })
                    })
                    describe('/comments', () => {
                        describe('POST', () => {
                            it('status: 201 responds with an inserted comment object', () => {
                                return request(app).post('/api/articles/1/comments')
                                .send({
                                    username: 'butter_bridge',
                                    body: 'Northcoders is great'
                                })
                                .expect(201)
                                .then(({body: {comments}}) => {
                                    expect(comments).to.contain.keys(
                                        'author',
                                        'body'
                                     )
                                })
                            })
                            it('status: 400 article_id does not exist in db', () => {
                                return request(app).post('/api/articles/1000/comments')
                                .send({
                                    username: 'butter_bridge',
                                    body: 'Northcoders is great'
                                })
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                            it('status: 400 invalid datatype input for article_id', () => {
                                return request(app).post('/api/articles/invalid/comments')
                                .send({
                                    username: 'butter_bridge',
                                    body: 'Northcoders is great'
                                })
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                            it('status: 400 posted a comment without a not nullable column name', () => {
                                return request(app).post('/api/articles/1/comments')
                                .send({
                                    username: 'butter_bridge'
                                })
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                            it('status: 400 posted a comment with no body at all', () => {
                                return request(app).post('/api/articles/1/comments')
                                .send({

                                })
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                            it('status: 400 posted comment has too many columns that do not exist on db', () => {
                                return request(app).post('/api/articles/1/comments')
                                .send({
                                    invalid: 'Invalid',
                                    invalid: 'Invalid',
                                    invalid: 'Invalid',
                                    invalid: 'Invalid'
                                })
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                        })
                        describe('GET', () => {
                            it('status: 200 Responds with an array of comments', () => {
                                return request(app).get('/api/articles/1/comments')
                                .expect(200)
                                .then(({body: {comments}}) => {
                                    expect(comments).to.be.an('array')
                                })
                            })
                            it('status: 200 Responds with a comments object with the correct properties', () => {
                                return request(app).get('/api/articles/1/comments')
                                .expect(200)
                                .then(({body: {comments}}) => {
                                    comments.forEach(comment => {
                                        expect(comment).to.contain.keys(
                                            'comment_id',
                                            'votes',
                                            'created_at',
                                            'author',
                                            'body'
                                        )
                                    })
                                })
                            })
                            it('status: 200 Able to take a sort_by query defaulted to created_at', () => {
                                return request(app).get('/api/articles/1/comments')
                                .expect(200)
                                .then(({body: {comments}}) => {
                                    expect(comments).to.be.ascendingBy('created_at')
                                })
                            })
                            it('status: 200 Able to take a sort_by query', () => {
                                return request(app).get('/api/articles/1/comments?sort_by=author&order=asc')
                                .expect(200)
                                .then(({body: {comments}}) => {
                                    expect(comments).to.be.ascendingBy('author')
                                })
                            })
                            it('status: 404 valid input however article_id does not exist in database', () => {
                                return request(app).get('/api/articles/1000/comments')
                                .expect(404)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('article_id 1000 does not exist in database')
                                })
                            }) 
                            it('status: 400 Invalid sort by query for a column that does not exist in the database', () => {
                                return request(app).get('/api/articles/1/comments?sort_by=invalid')
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                            it('status: 400 inputted invalid datatype for article_id', () => {
                                return request(app).get('/api/articles/invalid/comments')
                                .expect(400)
                                .then(({body: {msg}}) => {
                                    expect(msg).to.equal('Bad request')
                                })
                            })
                        })
                    })
                })
            })
            describe('/comments', () => {
                describe('/:comment_id', () => {
                    it('status: 405 Invalid method has been inputted', () => {
                        const invalidMethods = ['post', 'get']
                        const methodPromise = invalidMethods.map((method) => {
                            return request(app)[method]('/api/comments/1')
                            .expect(405)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Invalid method used')
                            })
                        })
                        return Promise.all(methodPromise)
                    })
                    describe('PATCH', () => {
                        it('status: 200 Responds with an object displaying the updated comment', () => {
                            return request(app).patch('/api/comments/1')
                            .send({
                                inc_votes: 1
                            })
                            .expect(200)
                            .then(({body: {comment}}) => {
                                expect(comment).to.be.an('object')
                            })
                        })
                        it('status: 200 Responds with the comments votes being incremented by 1', () => {
                            return request(app).patch('/api/comments/1')
                            .send({
                                inc_votes: 1
                            })
                            .expect(200)
                            .then(({body: {comment}}) => {
                                expect(comment.votes).to.equal(17)
                            })
                        })
                        it('status: 200 Responds with the comments votes being incremented by any other number -10', () => {
                            return request(app).patch('/api/comments/1')
                            .send({
                                inc_votes: -10
                            })
                            .expect(200)
                            .then(({body: {comment}}) => {
                                expect(comment.votes).to.equal(6)
                            })
                        }) 
                        it('status: 200 Responds with a comments object containing the correct properties', () => {
                            return request(app).patch('/api/comments/1')
                            .send({
                                inc_votes: -10
                            })
                            .expect(200)
                            .then(({body: {comment}}) => {
                                expect(comment).to.contain.keys(
                                    'comment_id',
                                    'author',
                                    'article_id',
                                    'votes',
                                    'created_at',
                                    'body'
                                )
                            })
                        })
                        it('status: 404 Valid input however comment id inputted does not exist in db', () => {
                            return request(app).patch('/api/comments/1000')
                            .send({
                                inc_votes: 1
                            })
                            .expect(404)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('comment_id 1000 does not exist in database')
                            })
                        })
                        it('status: 400 Invalid datatype for comment_id has been inputted', () => {
                            return request(app).patch('/api/comments/invalid')
                            .send({
                                inc_votes: 1
                            })
                            .expect(400)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Bad request')
                            })
                        })
                        it('status: 400 Invalid datatype for in_votes has been inputted', () => {
                            return request(app).patch('/api/comments/1')
                            .send({
                                inc_votes: 'invalid'
                            })
                            .expect(400)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Bad request')
                            })
                        })
                    })
                    describe('DELETE', () => {
                        it('status: 204 Responds with a succesful deletion of a comment by its comment_id', () => {
                            return request(app).delete('/api/comments/1')
                            .expect(204)
                            .then(() => {
                                return connection('comments').where({comment_id: 1})
                            })
                            .then((comment) => {
                                expect(comment.length).to.equal(0)
                            })
                        })
                        it('status: 404 valid input however comment_id does not exist in db', () => {
                            return request(app).delete('/api/comments/1000')
                            .expect(404)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('comment_id 1000 does not exist in database')
                            })
                        })
                        it('status: 400 Invalid datatype for comment_id inputted', () => {
                            return request(app).delete('/api/comments/invalid')
                            .expect(400)
                            .then(({body: {msg}}) => {
                                expect(msg).to.equal('Bad request')
                            })
                        })
                    })
                })
                
            })
        })
    })
})