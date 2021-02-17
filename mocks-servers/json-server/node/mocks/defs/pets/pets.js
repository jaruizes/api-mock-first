const petsData = () => {
    const pets = [];

    for (let i = 0; i < 100; i++) {
        pets.push({ id: i, name: `pet${i}` })
    }

    return pets
}

module.exports = petsData();
