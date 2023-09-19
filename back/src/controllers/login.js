const { User } = require('../DB_connection');

const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        if (!email || !password) {
            return res.status(404).send("Missing Data");
        }
        const findUser = await User.findOne({ where: { email } });
        if (!findUser) {
            return res.status(404).send("User not found");
        }
        if (findUser.password !== password) {
            return res.status(403).send("Incorrect Password");
        }
        return res.status(200).json({ access: true })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { login }