const { User } = require('../DB_connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env;

const postUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !req.body.password) return res.status(404).json("Missing Data.")
        const password = await bcrypt.hash(req.body.password, 8)
        const [newUser, created] = await User.findOrCreate({ where: { email, password } })
        const {id} = newUser.dataValues;
        const token = jwt.sign({id}, JWT_SECRET )
        res.status(201).json({messsage: "User created succesfully", token})
    } catch (error) {
        res.status(400).json({ error: error.messsage })
    }
    // try {
    //     const { email, password } = req.body;
    //     if (!email || !password) {
    //         return res.status(400).send('Missing Data.')
    //     }
    //     if(password.length < 6 || password.length > 10) {
    //         return res.status(400).send('Password must be between 6 and 10 characters')
    //     }
    //     const [newUser, created] = await User.findOrCreate({ where: { email, password } })
    //     if (!created) {
    //         return res.status(404).send("The entered email is already registered.");
    //     }
    //     return res.status(200).json(newUser)
    // } catch (error) {
    //     return res.status(500).json(error.message)
    // }
}

module.exports = { postUser };