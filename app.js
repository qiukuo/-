var express = require('express')
var path=require('path')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var _=require('underscore')
var User=require('./modules/user')
var port = process.env.PORT || 3000
var app = express()


mongoose.connect("mongodb://localhost/five")

app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.listen(port)

console.log("go go go go")

// index

app.get("/",function(req,res) {
	    res.render('index',{
            on:"no",
            users:" ",
            welcome:"密码请用纯数字",
            username:" "
	    })
})

// app.get("/:id",function(req,res) {
//     var id= req.param.id;
//     User.findById(id,function(err,user){
//           res.render('index',{
//           title:user.name,
//           users:"users"
//         })
//     })
// })
var win="no";
var frist="";
var last="";
var five1="";
var type=0;

app.post("/igo",function(req,res){
    if(frist==""||last==""){
        five1=req.body;
        type=0;
        win="no"
    }
})

app.post("/come",function(req,res){
    res.send({frist:frist,last:last})
})
app.post("/frist",function(req,res){
    frist=req.body.name;
    if(last!=""){
        if(last==frist){
            last="";
            res.send({fil:"change"})
        }
        else{
            res.send({fil:"go",name:last})
        }
    }
    else{
        res.send({fil:"no"})
    }
})

app.post("/last",function(req,res){
    last=req.body.name;
    if(frist!=""){
         if(last==frist){
            frist="";
            res.send({fil:"change"})
        }
        else{
            res.send({fil:"go",name:frist})
        }
    }
    else{
        res.send({fil:"no"})
    }
})

app.post("/end",function(req,res){
    if(frist==req.body.name){
        frist="";
        type=0;
    }
     if(last==req.body.name){
        last="";
         type=0;
    }
})

var tof="";
var tol="";
app.post('/resetting',
        function(req,res){
            if(req.body.hand=="frist"){
                tof="ok";
                if(tol=="ok"){
                     win="no";
                     frist="";
                     last="";
                     type=0;
                     tol="";
                     tof="";
                }
            }

            if(req.body.hand=="last"){
                tol="ok";
                if(tof=="ok"){
                     win="no";
                     frist="";
                     last="";
                     type=0;
                     tol="";
                     tof="";
                }
            }
        });

app.post('/ready',function(req,res){
     res.send({type:type,win:win});
})
app.post('/down',function(req,res){
        type=type+1;
        five1=req.body;
        res.send(five1);
})
app.post('/odown',function(req,res){
        res.send(five1);
})
app.post("/win",function(req,res){
    var winname=req.body.name;
    var losename;
    var lose_fen;
    var win_fen;
    if(winname==frist){
        losename=last;
        win="frist";
    }
    if(winname==last){
        losename=frist;
        win="last";
    }
    User.findByName(winname,function(err,user){
         user.fen=user.fen+3;
         user.save(function(err){
            if(err){
                console.log(err)
            }
         })
    })
    User.findByName(losename,function(err,user){
        user.fen=(user.fen)-3;
        user.save(function(err){
            if(err){
                console.log(err)
            }
         })
    })  
})
app.post('/',function(req,res){
    var newname=req.body.user;
    var password=req.body.password; 
    User.findByName(newname,function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            if(password==user.password){
                User.fetch(function(err,users){
                    if(err){
                        consolo.log(err);
                    }
                    res.render('index',{
                        on:"yes",
                        user:user,
                        users:users,
                        username:user.name,
                        welcome:"欢迎到来"+user.name
                    })
                })
            }
            else{
               res.send("此用户已存在且您的密码错误"); 
            }
        }
        else{
            var newUser=new User({
            name:newname,
            password:password,
            fen:0
            })
            newUser.save(function(err,user){
                if(err){
                    console.log(err)
                }
                res.send("注册成功，请重新登录")
            });
        }
    })
	// var username=req.body.user
	// var password=req.body.password
})