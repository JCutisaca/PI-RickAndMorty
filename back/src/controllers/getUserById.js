const { User } = require('../DB_connection')

const getUserById = async (id) => {
    findUser = await User.findByPk(id)
    
}

module.exports = getUserById;