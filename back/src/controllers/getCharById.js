const axios = require('axios')

const URL = "https://rickandmortyapi.com/api/character/"

const getCharById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axios(`${URL}${id}`);
        if (!data.name) throw error(`Failed Request Id: ${id}`);
        const character = {
            id: data.id,
            status: data.status,
            name: data.name,
            species: data.species,
            origin: data.origin,
            image: data.image,
            gender: data.gender
        }
        return res.status(200).json(character)
    } catch (error) {
        if (error.message.includes("Id")) return res.status(404).send(error.message)
        return res.status(500).send(error.message);
    }
}

module.exports = getCharById;