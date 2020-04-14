const {expect} = require('chai')
const request = require('supertest')
const app = require('../app')


describe('app', () => {
    describe('/api', () => {
        describe('/topics', () => {
            describe('GET', () => {
                it('status: 200 responds with an array of topic objects', () => {
                    return request(app).get('/api/topics')
                    .expect(200)
                    .then(({body: {topics}}) => {
                        expect(topics).to.be.an('array')
                        
                    })
                })
            })
        })
    })
})