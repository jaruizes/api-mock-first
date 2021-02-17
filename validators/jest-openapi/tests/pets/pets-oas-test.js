const jestOpenAPI = require('jest-openapi');
const path = require('path');
const axios = require('axios');

jestOpenAPI(path.resolve('../../defs/petstore/pets-expectations.js'));


// Important: env NODE instead Browser (testEnvironment in jest-config or --env=node in package.json)

describe('GET /pets', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get('http://localhost:3000/pets');

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('GET /pets?limit=20', () => {
    it('should satisfy OpenAPI spec with "limit" query param', async () => {
        const res = await axios.get('http://localhost:3000/pets?limit=20');

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('GET /pets/{id}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get('http://localhost:3000/pets/10');

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('POST /pets', () => {
    it('should satisfy OpenAPI spec', async () => {
        const pet = { name: 'Pet-test'}
        const res = await axios.post('http://localhost:3000/pets', pet);

        expect(res.status).toEqual(201);

        expect(res).toSatisfyApiSpec();
    });
});
