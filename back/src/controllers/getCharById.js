const axios = require('axios')

const URL = "https://rickandmortyapi.com/api/character/"

const getCharById = (req, res) => {
    const {id} = req.params;
    
    axios(`${URL}${id}`) 
    .then(response => response.data)
    .then(({name, gender, species, origin, image, status}) => {
        if(id && name) {
            const character = {
                id: parseInt(id),
                status,
                name,
                species,
                origin,
                image,
                gender
            }
            return res.status(200).json(character)
        } else {
            return res.status(404).send("Not found")
        }
    })
    .catch((error) => res.status(500).send(error.message)
    )
}

module.exports = getCharById;