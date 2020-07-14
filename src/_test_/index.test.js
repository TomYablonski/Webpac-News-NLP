const request = require('supertest');
const app = require('../server/index');
const mockAPI = require('../server/mockAPI');


describe('API Test', () => {
    it('[GET: /test] It should return a response for test endpoint', (done) => {
        request(app)
            .get('/test')
            .expect(200)
            .end((err, res) => {
                expect(res.body.title).toBe(mockAPI.title);
                expect(res.body.message).toBe(mockAPI.message);
                expect(res.body.time).toBe(mockAPI.time);
                done();
            })
    });

    it('[POST: /article] It should return a response for article endpoint', (done) => {
        request(app)
            .post('/article')
            .send({articleUrl: 'https://www.omaha.com/news/omaha-dealing-with-one-of-the-hottest-summers-on-record/article_7047e6ea-e5a9-529b-8f00-f3a1afa06cc7.html'})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toHaveProperty('polarity');
                expect(res.body).toHaveProperty('polarity_confidence');
                expect(res.body).toHaveProperty('subjectivity_confidence');
                expect(res.body).toHaveProperty('subjectivity');
                expect(res.body).toHaveProperty('text');
                done();
            })

    });
});

