const express = require( 'express');
const app = express();
const port = 8000;
const http = require( "http").Server( app );
const io = require( "socket.io")( http );
const body = require( "body-parser");

app.use( body.urlencoded( { extended:false } ) );
app.use( body.json() );

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );

app.get( '/', ( req, res ) => {
    res.render( "testsock");
});
app.get("/chat", (req,res)=>{
    res.render("socketenter");
});
app.post("/chat", (req,res)=>{
    if(req.body.name){
        let content = {
            username:req.body.name,
        }
        res.render("testsock", content);
    }
});
class User{
    constructor(id, name){
    this.id=id;
    this.name=name;
    this.laughnum=0;
    this.crynum=0;
    this.msgnum=0;
    }
    newcolor(){
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
    //최초 입장 소켓 아이디 부여
        console.log( "Socket connected", socket.id );
        io.emit( "systemMsg", '${socket.id.slice( 0,5 )} ***(socket.id)님이 입장하였습니다.' );
        
        socket.emit( 'skcreated',{ socketid: socket.id } );


        //메세지 받을 때 
        socket.on( "sendMsg", ( msg ) =>{
            io.emit( "newMsg");
        } );

        socket.on( "a", (a)=>{
            console.log(a);
            console.log("가요");
            socket.emit( "sendMsg", "hi");
        });
        
        socket.on("sendMsg",(msg) =>{
            io.emit('newMsg', { socketid : socket.id, msg: msg} );
        });
        socket.emit('myMsg', { socketid : socket.id} );

        socket.on("matchid", (data)=> {
            console.log(data);
            let newuser= new User(socket.id, data.username);
            ulist.push(newuser);
    
            io.emit("systemMsg", '${data.username}님이 입장하였습니다.');
            newlist();
            console.log(left_ulist);
        })
    
        socket.on( "disconnect", ()=>{
            console.log( "disconnect" );
            io.emit('systemMsg', socket.id + "님이 나갔다.");
        });
});

http.listen( port, () => {
    console.log("8000!");
});
