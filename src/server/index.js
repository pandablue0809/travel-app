const app = require('./server')

const port = 8081;
const server = app.listen(process.env.PORT || port, listening);

function listening(){
    console.log('Server Running');
    console.log(`Running on localhost: ${port}`);
}

module.exports = server;