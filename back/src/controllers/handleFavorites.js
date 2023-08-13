

let myFavorites = [];

const postFav = (req, res) => {
    const character = req.body;
    myFavorites.push(character);
    return res.json(myFavorites);
}
const deleteFav = (req, res) => {
    const {id} = req.params;
    myFavorites = myFavorites.filter(favorites => favorites.id !== Number(id))
    return res.json(myFavorites);
}

module.exports = {postFav, deleteFav}
