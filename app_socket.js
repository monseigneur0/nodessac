const express = require( 'express');
const app = express();
const port = 8000;
const http = require( "http").Server( app );
const io = require( "socket.io")( http );

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );

app.get( '/', ( req, res ) => {
    res.render( "testsock");
});

class User{
    constructor(id, name){
        this.id=id;
        this.name=name;
        this.color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
        this.laughnum=0;
        this.crynum=0;
        this.msgnum=0;
    }

    newcolor(){
        this.color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
    }
    laughnum(num){
        this.laughnum+=Number(num);
    }
    crynum(num){
        this.crynum+=Number(num);
    }
    msgnum(num){
        this.msgnum+=Number(num);
    }
}

let ulist=[];
let left_ulist=[];
    //socket과 관련한 통신 작업을 모두 처리
io.on("connection", function( socket ){
//최초 입장
    console.log( "Socket connected", socket.id );

    io.emit( "systemMsg", socket.id + "님이 입장하였습니다." );

    socket.emit( 'skcreated', { socketid : socket.id});
    
    socket.on("aaa", () => {
        console.log( "aaa" );
    });

    let newlist=()=>{
        io.emit("newlist", { ulist: ulist, left_ulist: left_ulist });
    }

    socket.emit("primary", { id: socket.id});

    socket.on("matchid", (data)=> {
        console.log(data);
        let newuser= new User(socket.id, data.username);
        ulist.push(newuser);

        io.emit("systemMsg", '${data.username}님이 입장하였습니다.');
        newlist();
        console.log(left_ulist);
    })

    socket.on( "sendMsg", ( msg ) =>{
        io.emit( "newMsg", { socketid : socket.id, msg: msg} );
        socket.emit('myMsg', {msg: msg})
    } );

    socket.on( "disconnect", function () {
        io.emit( "systemMsg", socket.id + "님이 퇴장하였습니다." );
    });
} );
    //보낼때는 socket.emit
    //socket.on( "event", (data ) => {
    //disconnect는 나가다

http.listen( port, () => {
    console.log("8000!");
});
