const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect, assert } = chai;
chai.should()
chai.use(chaiHttp);

const app = require('../src/index')

describe('Chai Demo', function () {
  let name = 'John';
  // should, assert, expect
  it('should be of type string', function () {
    name.should.be.a('string')
    expect(name).to.be.a('string')
    assert.typeOf(name, 'string')
  })

  it('should equal John', function () {
    name.should.not.equal('Kate')
    name.should.equal('John')
    expect(name).to.equal('John')
    assert.equal(name, 'John')
  })
})

describe("Students", () => {
  describe("GET /", () => {
    it("should get all contacts", (done) => {
      chai.request(app)
        .get('/api/contacts/')
        .end((err, res) => {
          let expected = {
            "status": "success",
            "message": "Contacts retrieved successfully",
            "data": []
          }
          res.should.have.status(200);
          res.body.should.be.a('object');

          assert.equal(res.body.message, 'Contact retrieved successfully');
          assert.deepEqual(res.body.data, []);
          expect(res.body.data).to.eql([]);

          // We can also do this
          assert.deepEqual(res.body, expected)

        });

      done();
    });

    // // Test to get single student record
    // it("should get a single student record", (done) => {
    //      const id = 1;
    //      chai.request(app)
    //          .get(`/${id}`)
    //          .end((err, res) => {
    //              res.should.have.status(200);
    //              res.body.should.be.a('object');
    //              done();
    //           });
    //  });

    // // Test to get single student record
    // it("should not get a single student record", (done) => {
    //      const id = 5;
    //      chai.request(app)
    //          .get(`/${id}`)
    //          .end((err, res) => {
    //              res.should.have.status(404);
    //              done();
    //           });
    //  });
  });
  describe("POST /", () => {
    it("should post a contact", (done) => {
      let post_data = {
        "name": "Bill Chee",
        "email": "e0272507@u.nus.edu",
        "phone": "97935484",
        "gender": "Male"
      }
      chai.request(app)
        .post('/api/contacts/')
        .send(post_data)
        .end((err, res) => {
          let expected = {
            "message": "New contact created!",
            "data": {
              "name": "Bill Chee",
              "gender": "Male",
              "email": "e0272507@u.nus.edu",
              "phone": "97935484",
            }
          }
          contact_id = res.body.data._id
          expected.data._id = res.body.data._id
          expected.data.__v = res.body.data.__v
          expected.data.create_date = res.body.data.create_date

          res.should.have.status(200);
          res.body.should.be.a('object');
          assert.deepEqual(res.body, expected)

          // Gets the posted contact
          chai.request(app)
            .get(`/api/contacts/${contact_id}`)
            .end((err, res) => {
              var expected_copy = expected
              expected_copy.message = "Contact details loading.."
              assert.deepEqual(res.body, expected)
            })
        });

      done();
    });
  });

  describe("PUT /", () => {
    it("should update a contact", (done) => {
      let post_data = {
        "name": "Bill Chee",
        "email": "e0272507@u.nus.edu",
        "phone": "97935484",
        "gender": "Male"
      }

      let put_data = {
        "name": "Bill Chee2",
        "email": "e02725078@u.nus.edu",
        "phone": "979354845",
        "gender": "Mal"
      }

      // Higher Order function
      let chain_put = (res) => {
        let contact_id = res.body.data._id
        chai.request(app)
          .put(`/api/contacts/${contact_id}`)
          .send(put_data)
          .end((err, res) => {
            let expected = {
              "message": "Contact Info updated",
              "data": {
                "_id": "5f489708a48ba800218cb5b3",
                "create_date": "2020-08-28T05:32:56.290Z",
                "name": "Bill Chee2",
                "email": "e02725078@u.nus.edu",
                "phone": "979354845",
                "gender": "Mal",
                "__v": 0
              }
            }
            expected.data._id = res.body.data._id
            expected.data.__v = res.body.data.__v
            expected.data.create_date = res.body.data.create_date

            res.should.have.status(200);
            assert.deepEqual(res.body, expected)

            // Gets the updated contact
            chai.request(app)
              .get(`/api/contacts/${contact_id}`)
              .end((err, res) => {
                var expected_copy = expected
                expected_copy.message = "Contact details loading.."
                assert.deepEqual(res.body, expected)
              })
          });

      }

      chai.request(app)
        .post('/api/contacts/')
        .send(post_data)
        .then(chain_put)

      done();
    });
  });

  describe("DELETE /", () => {
    it("should post and delete the same contact", (done) => {
      let post_data = {
        "name": "Bill Chee",
        "email": "e0272507@u.nus.edu",
        "phone": "97935484",
        "gender": "Male"
      }

      // Higher Order function
      let chain_delete = (res) => {
        let contact_id = res.body.data._id
        chai.request(app)
          .delete(`/api/contacts/${contact_id}`)
          .end((err, res) => {
            let expected = {
              "status": "success",
              "message": "Contact deleted"
            }
            res.should.have.status(200);
            assert.deepEqual(res.body, expected)

            // Gets the updated contact
            chai.request(app)
              .get(`/api/contacts/${contact_id}`)
              .end((err, res) => {
                let expected = {
                  "message": "Contact details loading..",
                  "data": null
                }
                assert.deepEqual(res.body, expected)
              })

          });

      }

      chai.request(app)
        .post('/api/contacts/')
        .send(post_data)
        .then(chain_delete)

      done();
    });
  });

});
