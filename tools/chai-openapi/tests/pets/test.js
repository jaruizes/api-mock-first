const axios = require('axios');

const main = async () => {
    const res = await axios.get('http://localhost:3000/pets');
    console.log(res);
}

main();
