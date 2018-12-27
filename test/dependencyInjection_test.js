const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const routes = require('../app/routes');

chai.use(chaiHttp);
const request = chai.request;
const assert = chai.assert;

let mockDB = {}
server.use(routes.createRoutes(mockDB))

describe('request with dependency injection', function() {
  describe.only('/item/:id', function() {
    it('returns 404', (done) => {
      mockDB.find = (_) => null
      request(server).get('/item/5')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
    });

    it('returns 200', (done) => {
      mockDB.find = (id) => { return { id } }
      request(server).get('/item/15')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { id: '15' });
        done();
      });
    });
  })
})
