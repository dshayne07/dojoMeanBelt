let path              = require("path");
let mongoose          = require("mongoose");
let UserController    = require("../controllers/UserController.js");
let QuestionController = require("../controllers/QuestionController.js");
let AnswerController   = require("../controllers/AnswerController.js");

module.exports = function(app){
    //Users
    app.post("/server/users/login",UserController.login);
    app.post("/server/users/register",UserController.register);
    app.get("/server/users/logout",UserController.logout);
    app.get("/server/users/session",UserController.session);

    //Questions    
    app.post("/server/question/new",QuestionController.create);

    app.get("/server/question/:id",QuestionController.get);
    app.get("/server/question",QuestionController.all);

    //Answers
    app.post("/server/answer",AnswerController.create);
    app.get("/server/answer/like/:id",AnswerController.like);

    app.all("*",(req,res,next)=>{
        res.sendFile(path.resolve("./client/dist/index.html"))
    });
}