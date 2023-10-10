const { User } = require('../DB_connection')

const loginGoogle = async (req, res) => {
    try {
        const { accessToken, profileObj } = req.body;
        const { email, name, familyName } = profileObj;
        const findUser = await User.findOne({where: email})
    } catch (error) {

    }
}

module.exports = loginGoogle;