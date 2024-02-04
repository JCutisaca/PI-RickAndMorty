const server = require('./src/app.js')
const {conn} = require('./src/DB_connection.js')
const { PORT } = process.env;

const port = PORT || 3001;
const host = "0.0.0.0";

conn.sync({ force: false }).then(() => {
  server.listen(port, host, () => {
    console.log(`Server listening on port ${port}`);
  })
}).catch(error => console.error(error))
