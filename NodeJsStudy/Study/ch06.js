/**
 * ch06 : ORACLE 연동하기
 */


// 1. oracledb모듈 설치 (oracle 사에서 공시지원하는 모듈)
// npm install oracledb

// 2. node.js와의 연동 test
// dbconfig.js
var oracledb = require('oracledb');

module.exports = {
		user : process.env.NODE_ORACLEDB_USER || "계정아이디",
		password : process.env.NODE_ORACLEDB_PASSWORD || "비밀번호",
		connectionString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "호스트이름/자신의 sid"
};

//config/database.js
module.exports = {
  hrPool: {
    user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};

// index.js
//*** line that requires services/web-server.js is here ***
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;
 
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize

// services/database.js
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
 
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}
 
module.exports.initialize = initialize;


/**
 * 데이터베이스 사용하기
 * 
 * 데이터베이스 열고 로그인 화면에 붙이기
 * 
 */

//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');


//===== MySQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기 =====//
var mysql = require('mysql');

//===== MySQL 데이터베이스 연결 설정 =====//
var pool      =    mysql.createPool({
    connectionLimit : 10, 
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'test',
    debug    :  false
});



//===== Express 서버 객체 만들기 =====//
var app = express();


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));

//===== body-parser, cookie-parser, express-session 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

//===== 라우터 미들웨어 사용 =====//


//사용자 추가 함수
app.post('/process/adduser', function(req, res) {
	console.log('/process/adduser 호출됨.');

	var paramId = req.param('id');
	var paramName = req.param('name');
	var paramAge = req.param('age');
	var paramPassword = req.param('password');
	
	if (pool) {
		addUser(paramId, paramName, paramAge, paramPassword, function(err, result) {
			if (err) {throw err;}
			
			if (result) {
				console.dir(result);

				console.log('inserted ' + result.affectedRows + ' rows');
	        	
	        	var insertId = result.insertId;
	        	console.log('추가한 레코드의 아이디 : ' + insertId);
	        	
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
});

//사용자를 등록하는 함수
var addUser = function(id, name, age, password, callback) {
	console.log('addUser 호출됨.');
	
	// 커넥션 풀에서 연결 객체를 가져옵니다.
	pool.getConnection(function(err, conn) {
        if (err) {
        	conn.release();  // 반드시 해제해야 합니다.
          return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    	// 데이터를 객체로 만듭니다.
    	var data = {id:id, name:name, age:age, password:password};
    	
        // SQL 문을 실행합니다.
        var exec = conn.query('insert into users set ?', data, function(err, result) {
        	conn.release();  // 반드시 해제해야 합니다.
        	console.log('실행 대상 SQL : ' + exec.sql);
        	
        	if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);
        		
        		callback(err, null);
        		
        		return;
        	}
        	
        	callback(null, result);
        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
              callback(err, null);
        });
    });
	
}



// 로그인 처리 함수
app.post('/process/login', function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.param('id');
	var paramPassword = req.param('password');
	
	if (pool) {
		authUser(paramId, paramPassword, function(err, rows) {
			if (err) {throw err;}
			
			if (rows) {
				console.dir(rows);

				var username = rows[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
				res.end();
			
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login2.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});


// 사용자를 인증하는 함수
var authUser = function(id, password, callback) {
	console.log('authUser 호출됨.');
	
	// 커넥션 풀에서 연결 객체를 가져옵니다.
	pool.getConnection(function(err, conn) {
        if (err) {
        	conn.release();  // 반드시 해제해야 합니다.
          return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
          
        var columns = ['id', 'name', 'age'];
        var tablename = 'users';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ?", [columns, tablename, id, password], function(err, rows) {
            conn.release();  // 반드시 해제해야 합니다.
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
    	    	callback(null, rows);
            } else {
            	console.log("일치하는 사용자를 찾지 못함.");
    	    	callback(null, null);
            }
        });

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);
            
            callback(err, null);
      });
    });
	
}

//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});


