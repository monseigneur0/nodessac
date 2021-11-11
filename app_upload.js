const express = require( 'express');
const app = express();
const port = 8000;
const path = require( "path" );
const multer = require( 'multer' ); //모듈 불러오기

app.use( '/static', express.static( __dirname + '/statics' ));


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
// var upload_multer = multer({
//     dest: "upload/"
//     //파일 업로드 할 때 어떤 폴더에 넣을거냐
// });

app.set( "view engine", "ejs");
app.set( "views", __dirname + "/views" );

app.get( '/', ( req, res )   => {
    res.render( "upload");
});
// 파이썬의 managepy 서버 열어라 app도 변수, express도 불러온 함수
app.listen( port, () => {
    console.log("8000!");
} );
app.post("/upload", upload_multer.single("userfile") , (req, res) => {
    //upload_multer.single : 단일파일처리
    //upload_multer.array : 여러가지 파일 선택
    //upload_multer.field( {name:filename, name2: fieefwef}) : 단일파일처리 여러번
    console.log( req.file );
    res.send("success");

});
app.post("/upload-multiple", upload_multer.array("userfile") , (req, res) => {
    //upload_multer.single : 단일파일처리
    //upload_multer.array : 여러가지 파일 선택
    //upload_multer.field( {name:filename, name2: fieefwef}) : 단일파일처리 여러번
    res.send("success");
});