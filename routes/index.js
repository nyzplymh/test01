var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get("/home",function(req,res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("home",{title:'Home'});         //已登录则渲染home页面
});

router.route('/register').get(function (req, res ) {
    res.render('register',{title: "user Register"});
}).post(function (req, res ) {
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upsw = req.body.upwd;

    User.findOne({name : uname},function ( err ,doc ) {
        if( err ){
            res.send(500);
            console.log('服务器异常！');
        }else if( doc ){
            req.session.error ='用户已存在';
            res.send( 500 );
        }else {
            User.create({
                name : uname,
                password : upsw
            },function ( err ,doc ) {
                if(err){
                    res.send( 500 );
                    console.log('用户创建失败',err );
                }else{
                    req.session.error = '用户创建成功';
                    res.send( 200 );
                }
            })
        }
    })
});


router.get('/logout',function (req, res ) {
    req.session.user = null ;
    req.session.error = null ;
    res.redirect('/');
});
module.exports = router;
