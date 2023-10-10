const router = require('express').Router();
const getCharById = require('../controllers/getCharById');
const { postFav } = require('../controllers/postFav');
const { deleteFav } = require('../controllers/deleteFav')
const { login } = require('../controllers/login');
const { postUser } = require('../controllers/postUser')
const jwt = require('jsonwebtoken');
const loginGoogle = require('../controllers/loginGoogle');
const {JWT_SECRET} = process.env;

const verifyToken = async (req, res, next) => {
    try {
        if(!req.headers.authorization) return res.status(500).json({error: "No tenes autorizacion mi rey"})
        const token = req.headers.authorization.split(" ")[1]
        if(!token) return res.status(404).json("Amigo o enemigo????")
        const tokenVerified = await jwt.verify(token, JWT_SECRET)
        req.user = tokenVerified.id
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

router.get("/character/:id", verifyToken, (req, res) => {
    getCharById(req, res)
})
router.post("/login", (req, res) => {
    login(req, res)
})
router.post("/loginGoogle", (req, res) => {
    loginGoogle(req, res)
})
router.post("/signup", (req, res) => {
    postUser(req, res)
})
router.post("/fav", (req, res) => {
    postFav(req, res)
})
router.delete("/fav/:id", (req, res) => {
    deleteFav(req, res)
})

module.exports = router;