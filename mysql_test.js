var express = require('express');
var app = express();
var mysql = require( 'mysql' );

var conn = mysql.createConnection({
	user: 'root',
	password: 'rlaxkrgh1!',
	database: 'ssac'
});

app.listen( 8003, function () {
	console.log( conn );
	console.log( conn.state );

    console.log( "Listening on *:3000" );
});