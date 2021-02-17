const mockServerClient = require('mockserver-client').mockServerClient;
const handleCreationPromise = (expectName) => {
  console.log(`${expectName} created`);

}

const handleErrorCreationPromise = (error) => {
  console.log(error);
}

function createExpectation(expectName, expectDef) {
  mockServerClient("localhost", 1080).mockAnyResponse(expectDef)
      .then(handleCreationPromise(expectName), handleErrorCreationPromise);
}

function createOpenAPIExpectation(expectName, expectDef) {
  mockServerClient("localhost", 1080).openAPIExpectation(expectDef)
      .then(handleCreationPromise(expectName), handleErrorCreationPromise);
}

module.exports = {
  createExpectation: createExpectation,
  createOpenAPIExpectation: createOpenAPIExpectation
};
