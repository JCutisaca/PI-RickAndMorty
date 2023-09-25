const { User } = require('../DB_connection')

const postUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Missing Data.')
        }
        if(password.length < 6 || password.length > 10) {
            return res.status(400).send('Password must be between 6 and 10 characters')
        }
        const [newUser, created] = await User.findOrCreate({ where: { email, password } })
        if (!created) {
            return res.status(404).send("The entered email is already registered.");
        }
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { postUser };