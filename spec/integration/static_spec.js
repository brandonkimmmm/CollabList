const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:5000/api/';

describe('routes : static', () => {
    describe('GET /', () => {
        it('should return status code 200', (done) => {
            request.get(`${base}hello`, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
});