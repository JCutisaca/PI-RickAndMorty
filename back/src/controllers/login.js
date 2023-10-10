const { User } = require('../DB_connection');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env;

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const findEmail = await User.findOne({where: {email}})
        if(!findEmail) return res.status(404).json("User not found")
        const {id} = findEmail.dataValues;
        const validatePass = await bcrypt.compare(password, findEmail.dataValues.password)
        if(!validatePass) return res.status(404).json("Credenciales invalidas")
        const token = jwt.sign({id, email}, JWT_SECRET )
        res.status(200).json({token})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
    // try {
    //     const { email, password } = req.query;
    //     if (!email || !password) {
    //         return res.status(404).send("Missing Data");
    //     }
    //     const findUser = await User.findOne({ where: { email } });
    //     if (!findUser) {
    //         return res.status(404).send("User not found");
    //     }
    //     if (findUser.password !== password) {
    //         return res.status(403).send("Incorrect Password");
    //     }
    //     return res.status(200).json({ access: true })
    // } catch (error) {
    //     return res.status(500).json(error.message)
    // }
}

module.exports = { login }