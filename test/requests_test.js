process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
const request = chai.request(server);
const assert = chai.assert;

describe('request', function() {
  describe('/ping', function() {
    it('returns 200 pong', (done) => {
      request.get('/ping')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'pong');
        done();
      });
    });
  })
})
