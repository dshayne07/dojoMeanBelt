let Question = require("mongoose").model("Question");
let Answer = require("mongoose").model("Answer");
let User    = require("mongoose").model("User");

module.exports = {
    create:function(req,res){
        let answer = new Answer(req.body);
        answer._user = req.session.user._id;

        answer.save((err)=>{
            if(err){
                return res.json({errors:answer.errors})
            }else{
                User.findOne({_id:req.session.user._id}, (err,user)=>{
                    if(user){
                        user.answers.push(answer);
                        user.save((err)=>{
                            if(err){
                                return res.json({errors:user.errors});
                            }else{
                                Question.findOne({_id:req.body._question}, (err,question)=>{
                                    if(question){
                                        question.answers.push(answer);
                                        question.save((err)=>{
                                            if(err){
                                                return res.json({errors:question.errors});
                                            }else{
                                                return res.json(answer);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }
        })
    },
    like:function(req,res){
        Answer.findOne({_id:req.params.id},(err,answer)=>{
            if(err){
                return res.json({errors:"Failed to find answer"})
            }
            else{
                answer.likes += 1;
                answer.save((err)=>{
                    if (err){
                        return res.json({errors:answer.errors});
                    }else{
                        return res.json(answer);
                    }
                })
            }
        })  
    }
}