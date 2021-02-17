const chai = require('chai');
const expect = chai.expect;
const path = require('path');
const axios = require('axios');
const chaiResponseValidator = require('chai-openapi-response-validator');

chai.use(chaiResponseValidator(path.resolve('../../defs/petstore/pets-expectations.js')));

describe('GET /pets', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get('http://localhost:3000/pets');

        expect(res.status).to.equal(200);

        // Assert that the HTTP response satisfies the OpenAPI spec
        expect(res).to.satisfyApiSpec;
    });
});
