const http = require('http');
const {getChardById} = require('./controllers/getCharById')

http
.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.url.includes("/rickandmorty/character")) {
        let id = req.url.split("/").pop();
        getChardById(res, id)
    }
})
.listen(3001, "localhost")
