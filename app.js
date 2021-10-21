//express
//Node.js 를 위한 바르고 개방적인 웹 프레임워크
//ejs : embedded jabaSvript templating

const express = require( 'express');
const app = express();
const port = 8000;

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );
//dirname 절대경로로 현재위치 지정 뒤에 폴더이름밑
app.use( '/static', express.static( __dirname + '/statics' ));

app.get( '/', ( req, res )   => {
    res.send( "안녕");
});

app.listen( port, () => {
    console.log("8000!");
} );

app.get( '/test', ( req, res )   => {
    res.render( "test", { para1 : 1, para2 : '코딩온' } );
});

app.get( '/form', ( req, res )   => {
    console.log(req.query.id)
    res.render( 'form' );
});

app.post( '/form22', ( req, res ) => {
    console.log( "Post form 들어옴");
    res.send( "hi");
});


