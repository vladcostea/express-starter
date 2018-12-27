const chai = require('chai');
const chaiHttp = require('chai-http');
/**
 * This test file needs to be run on it's own, without even reading other test files that require('../app').
 * This is weird, as per the proxyquire docs, the require cache should kick in if you're not messing with it,
 * so multiple servers should not be started https://www.npmjs.com/package/proxyquire#forcing-proxyquire-to-reload-modules
 */
const proxyquire = require('proxyquire');
let dbMock = {};
const server = proxyquire('../app', { './db': dbMock });

chai.use(chaiHttp);
const request = chai.request;
const assert = chai.assert;

const mockFind = (id) => {
  return id < 10 ? null : { id }
}

describe('request with rewire', function() {
  describe('/find', function() {
    it('returns 200 and the object', (done) => {
      dbMock.find = mockFind
      request(server).get('/find/5')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
    });

    it('returns 404', (done) => {
      dbMock.find = mockFind
      request(server).get('/find/15')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { id: '15' });
        done();
      });
    });
  })
})
