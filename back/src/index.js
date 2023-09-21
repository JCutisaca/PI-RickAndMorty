const server = require('./app')
const {conn} = require('./DB_connection')
const { PORT } = process.env;

const port = PORT;

server.listen(PORT, () => {
    conn.sync({force: false})
    console.log('Server raised in port: ' + PORT);
})
