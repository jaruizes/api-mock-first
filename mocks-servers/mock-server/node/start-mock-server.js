const mockserver = require('mockserver-node');
const petsExpectations = require('./expectations/pets/pets-expectations')

mockserver.start_mockserver({
    serverPort: 1080,
    trace: true,
    tls: false
}).then(() => {
    petsExpectations.loadPetsExpectation();
});
