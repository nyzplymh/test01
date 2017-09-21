var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('login', {title : "User login"})
});

router.post('/',function (req, res ) {
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;

    User.findOne({name : uname },function (err , doc) {
        if(err){
            res.sendStatus(500);
            console.log(err);
        }else if (!doc){
            req.session.error='用户不存在 ';
            res.sendStatus(404);
        }else{
            if(upwd != doc.password){
                req.session.error='用户名或密码不匹配';
                res.sendStatus(404);
            }else{
                req.session.user = doc ;
                res.sendStatus(200);
            }
        }
    })
});

/*
router.route("/").post(function(req,res){                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.send(404);                            //    状态码返回404
            //    res.redirect("/login");
        }else{
            if(req.body.upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                res.send(404);
                //    res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                res.send(200);
                //    res.redirect("/home");
            }
        }
    });
});
*/

module.exports = router ;