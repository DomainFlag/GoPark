let {MongoClient} = require("mongodb");
let _db;

module.exports = {
    connect : function(callback) {
        MongoClient.connect("mongodb://localhost:27017", function(err, db) {
            if(err) {
                console.log("Couldn't connect to db");
                db.close();
            } else {
                _db = db;
                return callback();
            }
        });
    },
    getDb : function() {
        return _db;
    }
};