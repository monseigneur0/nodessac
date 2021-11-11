const express = require( 'express');
const app = express();
const port = 8000;
const ejs = require("ejs");         // ejs 모듈 요청
const http = require( "http").Server( app );
const io = require( "socket.io")( http );
const body = require( "body-parser");
const path = require( "path" );

app.use(express.static('upload')); //사진 업로드
app.use( body.urlencoded( { extended:false } ) );
app.use( body.json() );

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );

app.get( '/', ( req, res ) => {
    res.render( "testsock");
});
class User{
    constructor(id, name){
    this.id=id;
    this.name=name;
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

app.get("/chat", (req,res)=>{
    res.render("socketenter");
});
app.post("/chat", (req,res)=>{
    if(req.body.name){
        let content = {
            username:req.body.name,
        }
        console.log("닉네임 검사");
        console.log(content.username);
        //닉네임 검사
        res.render("testsock", content);
    }
});


const multer = require( 'multer' ); //모듈 불러오기

var multer_storage = multer.diskStorage( {
    destination: (req, file, cb) =>{
        cb(null, "upload");
    },
    filename: ( req, file, cb) =>{
        //path라는 모듈을 사용해서 이 파일의 확장자를 가져올 수 있다. 
        //extname 이라는 함수를 사용하면 .확장자가 나옵니다. 
        // ex> path.extname("1.txt"); -> .txt
        //basename 이름 추출 
        //Date.now() 1970년 1월 1일 0시 0분 0초부터 지금까지 경과된 밀리초
        var newname = path.extname( file.originalname );
        cb( null, file.originalname );
        cb( null, Date.now() + path.extname(file.originalname) );
    }
});
var upload_multer = multer({ storage: multer_storage });
app.post("/upload", upload_multer.single("userfile") , (req, res) => {
    //upload_multer.single : 단일파일처리
    //upload_multer.array : 여러가지 파일 선택
    //upload_multer.field( {name:filename, name2: fieefwef}) : 단일파일처리 여러번
    console.log( req.file );
    res.send("success");

});

//socket과 관련한 통신 작업을 모두 처리
io.on("connection", function( socket ){
    //최초 입장 소켓 아이디 부여
        console.log( "Socket connected", socket.id );
        socket.emit( 'skcreated',{ socketid: socket.id } );

        socket.on( "a", (a)=>{
            console.log(a);
            console.log("가요");
            socket.emit( "sendMsg", "hi");
        });
        //메세지 보낼 때
        socket.on("sendMsg",(msg) =>{
            io.emit('newMsg', { socketid : socket.id, msg: msg} );
            console.log("메세지 검사"+msg);
            console.log("소켓아이디 검사"+socket.id);
        });
        socket.emit('myMsg', { socketid : socket.id} );

        let newulist = () =>{
            io.emit("newulist", {ulist:ulist, left_ulist:left_ulist});
        }
        socket.on("matchid", (data)=> {
            console.log(data);
            let newuser= new User(socket.id, data.username);
            ulist.push(newuser);
            console.log(ulist);
            newulist();
            io.emit("systemMsg", socket.id + data.username +'님의 채팅을 시작합니다.');
            console.log(left_ulist);
        });



        socket.on( "disconnect", ()=>{
            console.log( "disconnect" );
            io.emit('systemMsg', socket.id + "님이 나갔다.");
        });
        
        var roomName = null; 
        //join : 채팅방에 대한 이벤트
        socket.on('join', (data) => { 
            roomName = data; 
            socket.join(data);
        })
        //message : 기본 메세지 전송에 대한 이벤트 
        socket.on('message', (data) => { 
            io.sockets.in(roomName).emit('message', data);
            console.log(data); 
        }); 


});




http.listen( port, () => {
    console.log("8000!");
});
