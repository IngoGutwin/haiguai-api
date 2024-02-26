const http = require('node:http');

const app = require('./app');

const PORT = process.env.API_PORT || process.env.DEBUGGER_PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
