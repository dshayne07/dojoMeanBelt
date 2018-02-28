let User = require("mongoose").model("User");

module.exports = {
    register:function(req,res){
        let errs = [];
        console.log(req.body);
        User.find({email:req.body.email},function(err,user){
            if(user.length > 0){
                errs.push("A user with this email already exists.");
                res.json({errors:errs});
            }else{
                let user = new User(req.body);
                console.log(user);
                user.save(function(err){
                    if(err){
                        errs.push(err)
                        res.json({errors:errs});
                    }
                    else{
                        req.session.user = user;
                        res.json({user:req.session.user});
                    }
                })
            }
        })
    },
    login:function(req,res){
        User.findOne({email:req.body.email},(err,user)=>{
            if(!user){
                return res.json({errors:"No user with this email was found."});
            }else{
                if(req.body.password == user.password){
                    req.session.user = user;
                    return res.json(user);
                }else{
                    return res.json({errors:"Invalid Credentials."});
                }
            }
        });
    },
    logout:function(req,res){
        req.session.user = null;
        return res.json(true);
    },
    session:function(req,res){
        if (req.session.user){
            return res.json(req.session.user);
        }
        else{
            return res.json({errors:"User not in session"})
        }
    }
}