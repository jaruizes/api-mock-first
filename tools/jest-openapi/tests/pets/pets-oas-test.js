const jestOpenAPI = require('jest-openapi');
const path = require('path');
const axios = require('axios');
const mocksConfig = require('./mocks-config.json');

const mockServer = mocksConfig.server;
const apiDef = mocksConfig.apiDef;
jestOpenAPI(path.resolve(apiDef));


// Important: env NODE instead Browser (testEnvironment in jest-config or --env=node in package.json)

describe('GET /pets', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(`${mockServer}/pets`);

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('GET /pets?limit=20', () => {
    it('should satisfy OpenAPI spec with "limit" query param', async () => {
        const res = await axios.get(`${mockServer}/pets?limit=20`);

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('GET /pets/{id}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(`${mockServer}/pets/1`);

        expect(res.status).toEqual(200);

        expect(res).toSatisfyApiSpec();
    });
});

describe('GET /pets/{id}', () => {
    it('should satisfy OpenAPI spec: error case', async () => {
        try {
            const res = await axios.get(`${mockServer}/pets/10`);
        } catch (error) {
            expect(error.response.status).toEqual(404);
            expect(error.response).toSatisfyApiSpec();
        }
    });
});

describe('POST /pets', () => {
    it('should satisfy OpenAPI spec', async () => {
        const pet = { name: 'good name'}
        const res = await axios.post(`${mockServer}/pets`, pet);

        expect(res.status).toEqual(201);

        expect(res).toSatisfyApiSpec();
    });
});

describe('POST /pets', () => {
    it('should satisfy OpenAPI spec: error case ', async () => {
        const pet = { name: 'wrong name'}
        try {
            const res = await axios.post(`${mockServer}/pets`, pet);
        } catch (error) {
            expect(error.response.status).toEqual(500);
            expect(error.response).toSatisfyApiSpec();
        }
    });
});
