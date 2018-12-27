const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
const request = chai.request;
const assert = chai.assert;

describe('request', function() {
  describe('/ping', function() {
    it('returns 200 pong', (done) => {
      request(server).get('/ping')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'text/html');
        assert.equal(res.text, 'pong');
        done();
      });
    });
  })

  describe('/find', function() {
    it('returns 200 and the object', (done) => {
      request(server).get('/find/5')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { id: '5' });
        done();
      });
    });

    it('returns 404', (done) => {
      request(server).get('/find/15')
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'not found' });
        done();
      });
    });
  })
})
