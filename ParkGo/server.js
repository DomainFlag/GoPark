let database = require("./connection");
let express = require("express");
let bodyParser = require("body-parser");
let multer = require("multer");

const lerp_ai = {
    "vide" : (val) => {
        return 1.0-val;
    },
    "bien" : (val) => val,
    "moyen" : (val) => {
        return 1.0-val/2;
    }
};

const multerConfig = {
    storage: multer.diskStorage({
        //Setup where the user's file will go
        destination: function(req, file, next) {
            next(null, './');
        },

        //Then give the file a unique name
        filename: function(req, file, next){
            next(null, file.originalname);
        }
    }),

    //A means of ensuring only images are uploaded.
    fileFilter: function(req, file, next){
        if(!file){
            next();
        }

        const image = file.mimetype.startsWith('image/');
        if(image){
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");

            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let watson = require('watson-developer-cloud');
let fs = require('fs');

let visual_recognition = new watson.VisualRecognitionV3({
    api_key: "cdd3945523266ded1770a05b20e4307f8555ebc3",
    version: 'v3',
    version_date: '2016-05-20'
});

app.use(function(req, res, next) {
    if(req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Accept, X-Access-Token, X-Key');
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.setHeader("Content-Type", "*");
        res.status(200).end();
    } else {
        next();
    }
});

app.get("/get-content", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    database.connect(function() {
        let _db = database.getDb().db("ParkGo");
        _db.collection("parkings").find({}).toArray().then(function(results) {
            res.send(JSON.stringify(results));
        }).catch(function(err) {
            res.send(err);
        });
        database.getDb().close();
    });
});

app.post("/post-content", function(req, res) {
    database.connect(function() {
        let _db = database.getDb().db("ParkGo");
        _db.collection("parkings").insertOne({
            parkingName : req.body.parkingName,
            coordinates : req.body.coordinates,
            total : req.body.total,
            places : req.body.places
        }, function(err, response) {
            if(err) {
                res.send(null);
            } else {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
                res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                res.send(null);
            }
        });
        database.getDb().close();
    });
});

app.post('/post-image', multer(multerConfig).single('photo'), function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    let parameters = {
        classifier_ids: ["DefaultCustomModel_1955674712"],
        threshold: 0.6
    };

    let params = {
        images_file: fs.createReadStream('./parking_example.jpg'),
        parameters: parameters
    };

    visual_recognition.classify(params, function(err, response) {
        if (err)
            console.log(err);
        else {
            // console.log("-----");
            // console.log(response);

            let percentage = lerp_ai[response.images[0].classifiers[0].classes[0].class](Number(response.images[0].classifiers[0].classes[0].score));

            let parking_name = req.body.parking_list;
            let updated;

            database.connect(function() {
                let _db = database.getDb().db("ParkGo");
                let cursor = _db.collection("parkings").find({parkingName : parking_name});

                cursor.forEach((val) => {
                    updated = _db.collection("parkings").update({
                        parkingName : parking_name
                    }, {
                        $set: { places : Math.round(percentage*val.total) }
                    });
                });

            });

            database.getDb().close();

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
            res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.send("");
        }
    });
});

app.use(express.static(__dirname));

app.listen(8000);