const path = require("path");
const expectations = require('../../util/expectations')

const openApiDefsFolder = path.join(__dirname, "..", "..", "..", "..", "..", "defs", "bank");

function createOpenApiPayloadExpectation(apiDefinitionFile) {
    const expectFolder = "file:" + path.join(openApiDefsFolder, apiDefinitionFile);
    return { "specUrlOrPayload": expectFolder }
}

const loadExpectations = () => {
    expectations.createOpenAPIExpectation("openApi_Accounts_Expectation", createOpenApiPayloadExpectation("account-service.yaml"));
    expectations.createOpenAPIExpectation("openApi_Accounts_Balance_Expectation", createOpenApiPayloadExpectation("account-balances.yaml"));
}

module.exports = {
    loadExpectations: loadExpectations
};
