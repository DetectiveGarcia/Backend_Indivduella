const mongoose = require('mongoose');

const databaseURI = process.env.MONGODB_URI;

function connectionToMongoDB() {
    mongoose.connect(databaseURI)
        .then(() => {
            console.log('Connected to DB', databaseURI);
        }).catch((error) => {
            console.log('Connection to DB not possible', error);
        })
}

module.exports = {
    connectionToMongoDB
}