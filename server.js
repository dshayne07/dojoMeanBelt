let express  = require("express");
let bParse   = require("body-parser");
let mongoose = require("mongoose");
let session  = require("express-session");
let bcrypt   = require("bcrypt");
let path     = require("path");
let app      = express();
let port     = 8000;
app.use(express.static(path.join(__dirname,'/client/dist')));
app.use(bParse.json());
app.use(bParse.urlencoded({ extended: true }));
app.use(session({secret:"hideme"}));
app.listen(port, function() {
    console.log("listening on port "+port);
});

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);