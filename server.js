const app = require('./api/src/app.js')
const { connectionToMongoDB } = require('./api/config/config.js');

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server running on', port);
    connectionToMongoDB()
})