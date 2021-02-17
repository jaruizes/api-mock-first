const expectations = require('../../util/expectations')

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

const loadExpectations = () => {
  expectations.createExpectation("expectation_GET_AllPets", expectation_GET_AllPets);
  expectations.createExpectation("expectation_GET_Pet_Error", expectation_GET_Pet_Error);
  expectations.createExpectation("expectation_GET_Pet", expectation_GET_Pet);
  expectations.createExpectation("expectation_POST_Pet_Error", expectation_POST_Pet_Error);
  expectations.createExpectation("expectation_POST_Pet", expectation_POST_Pet);
}

module.exports = {
  loadExpectations: loadExpectations
};
