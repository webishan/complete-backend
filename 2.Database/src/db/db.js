const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect("mongodb://ishankhan:38TT5zEDDMmLnmS0@ac-rzmj5kj-shard-00-00.metk4mz.mongodb.net:27017,ac-rzmj5kj-shard-00-01.metk4mz.mongodb.net:27017,ac-rzmj5kj-shard-00-02.metk4mz.mongodb.net:27017/halley?authSource=admin&tls=true");

    console.log("Connected to DB");
}

module.exports = connectDB;