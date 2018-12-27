const chai = require('chai');
const chaiHttp = require('chai-http');
const rewire = require('rewire');
const server = rewire('../app');

chai.use(chaiHttp);
const request = chai.request;
const assert = chai.assert;

const mockDB = {
  db: {
    find(id) {
      return id < 10 ? null : { id }
    }
  }
}

describe('request with rewire', function() {
  describe('/find', function() {
    it('returns 200 and the object', (done) => {
      let restore = server.__set__(mockDB);
      request(server).get('/find/5')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
    });

    it('returns 404', (done) => {
      let restore = server.__set__(mockDB);
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
