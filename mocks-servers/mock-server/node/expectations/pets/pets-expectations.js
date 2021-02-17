const mockServerClient = require('mockserver-client').mockServerClient;

const petsExpectations = [];
function petsData() {
  for (let i = 0; i < 100; i++) {
    petsExpectations.push({ id: i, name: `pet${i}` })
  }

  return petsExpectations
}

function getPet(id) {
  return petsExpectations[id];
}

const expectation_GET_AllPets = {
  "httpRequest": {
    "method": "GET",
    "path": "/pets"
  },
  "httpResponse": {
    "statusCode": 200,
    "body": petsData()
  }
}

const expectation_GET_Pet = {
  "httpRequest": {
    "method": "GET",
    "path": "/pets/{petId}",
    "pathParameters": {
      "petId": ["1"]
    },
  },
  "httpResponse": {
    "statusCode": 200,
    "body": getPet(1)
  }
}

const expectation_GET_Pet_Error = {
  "httpRequest": {
    "method": "GET",
    "path": "/pets/10"
  },
  "httpResponse": {
    "statusCode": 404,
    "body": {
      "code": 189998,
      "message": "Pet not found"
    }
  }
}

const expectation_POST_Pet = {
  "httpRequest": {
    "method": "POST",
    "path": "/pets",
    "body": {
      "name": "good name"
    }
  },
  "httpResponse": {
    "statusCode": 201
  }
}

const expectation_POST_Pet_Error = {
  "httpRequest": {
    "method": "POST",
    "path": "/pets",
    "body": {
      "name": "wrong name"
    }
  },
  "httpResponse": {
    "statusCode": 500,
    "body": {
      "code": 1111,
      "message": "Server Error"
    }
  }
}

const loadPetsExpectation = () => {
  createExpectation(expectation_GET_AllPets);
  createExpectation(expectation_GET_Pet_Error);
  createExpectation(expectation_GET_Pet);
  createExpectation(expectation_POST_Pet_Error);
  createExpectation(expectation_POST_Pet);
}

function createExpectation(expectationData) {
  mockServerClient("localhost", 1080).mockAnyResponse(expectationData).then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
  );
}

module.exports = {
  loadPetsExpectation: loadPetsExpectation
};
