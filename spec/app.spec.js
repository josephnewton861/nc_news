const {expect} = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')


describe('app', () => {
    after(() => {
        connection.destroy()
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
                    })
                })
            describe('/users', () => {
                describe('/:username', () => {
                    describe('GET', () => {
                        it('status: 200 Responds with an user object', () => {
                            return request(app).get('/api/users/tickle122')
                            .expect(200)
                            .then(({body: {user}}) => {
                                expect(user).to.be.an('object')
                            })
                        })
                        it('status: 200 Responds with an user object', () => {
                            return request(app).get('/api/users/tickle122')
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
                                expect(msg).to.equal('Valid input, however username coder1000 does not exist in database')
                            })
                        })
                    })
                })
            })
        })
    })
})