//express
//Node.js 를 위한 바르고 개방적인 웹 프레임워크
//ejs : embedded jabaSvript templating
//없으면 npm install express등 
const express = require( 'express');
const app = express();
const port = 8000;
const body = require( "body-parser");
const { connect } = require('http2');
// 폼전송을 위한 외부 모듈
app.use( body.urlencoded( { extended:false } ) );
app.use( body.json() );

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );
//dirname 절대경로로 현재위치 지정 뒤에 폴더이름밑 내장 상수
app.use( '/static', express.static( __dirname + '/statics' ));


app.get( '/', ( req, res )   => {
    res.send( "안녕");
});
// 파이썬의 managepy 서버 열어라 app도 변수, express도 불러온 함수
app.listen( port, () => {
    console.log("8000!");
} );

app.get( '/test', ( req, res )   => {
    res.render( "test", { para1 : 5, para2 : '코딩온' } );
});

app.get( '/form', ( req, res )   => {
    console.log(req.query.id)
    res.render( 'form' );
});

app.post( '/form22', ( req, res ) => {
    console.log( "Post form 들어옴");
    res.send( "hi");
});

// app.get( '/join', ( req, res )   => {
//     console.log("join")
//     console.log(req.query.id)
//     res.render( 'join' );
// });
//req.body.앞에서지정한이름(포스트로 넘어왔을때)

app.post( '/join', function(req, res){
    console.log(req. body)
    console.log("Post form 들어옴");
    var id = req.body.id;s
    var name = req.body.name;

    var sql = "INSERT INTO member VALUES( '"+ id +"','"+name +"','2021-10-21' );";
    connect.query(sql, function(err) {
        if( err ){
            console.log( 'failed!! : ' + err );
        }
        else {
            console.log( "data inserted!" );
        }
    });
    res.render('signup', {id: id, name: name});
});

app