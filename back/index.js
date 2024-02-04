const server = require('./src/app.js')
const {conn} = require('./src/DB_connection.js')
const { PORT } = process.env;

const port = PORT || 3001;

server.listen(PORT, () => {
    conn.sync({force: false})
    console.log('Server raised in port: ' + PORT);
})
