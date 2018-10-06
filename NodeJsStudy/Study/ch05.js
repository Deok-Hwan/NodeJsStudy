/**
 * ch05 웹 서버 만들기
 */

// ch05-1 간단한 웹 서버 만들기
var http = require('http');

// 웹 서버 객체를 만듭니다.
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기합니다.
var port = 3000;

server.listen(port, function(){
	console.log('웹 서버가 시작되었습니다. : %d', port);
});

// http 모듈에 들어 있는 서버 기능을 사용하려면 먼저 require() 메소드로 http 모듈을 불러온다.
// createServer() -> listen() 메소드  -> 서버를 시작할 때는 포트를 3000번으로 지정하여 해당 포트에서 클라이언트의 요청을 대기합니다.
// 

// createServer() 메소드를 호출하여 웹 서버 객체를 만들고, 그 객체의 listen() 메소드를 호출하여 특정 포트에서 대기하도록 설정
// 메소드 이름													설명	
// listen(port, [hostname], [backlog], [callback])			서버를 실행하여 대기시킵니다.
// close([callback])										서버를 종료합니다.

// 웹 서버를 시작하여 192.168.0.5 IP 와 3000번 포트에서 대기하도록 설정
var host = 'localhost';
var port = 3000;
server.listen(port, host, '50000', function(){
	console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
});

// 클라이언트가 웹 서버에 요청할 때 발생하는 이벤트 처리하기
// 이벤트 이름 						설명
// connection					클라이언트가 접속하여 연결이 만들어질 때 발생하는 이벤트입니다.
// request						클아이언트가 요청할 때 발생하는 이벤트
// close						서버를 종료할 때 발생하는 이벤트

var http = require('http');

// 웹 서버 객체를 만듭니다.
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기하도록 설정합니다.
var port = 3000;
server.listen(port, function(){
	console.log('웹 서버가 시작되었습니다. : %d', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket){
	var addr = socket.address();
	console.log('클라이언트가 접속했습니다. : %s, %d', addr.addess, addr.port);
});

//클라이언트 연결 이벤트 처리
server.on('request', function(req, res){
	console.log('클라이언트 요청이 들어왔습니다.');
	console.dir(req);
});

// 서버 종료 이벤트 처리
server.on('close', function(){
	console.log('서버 종료');
});

// 클라이언트가 웹 서버에 연결되면 connection 이벤트가 발생합니다.
// 연결이 만들어져 콜백 함수가 호추될 때는 Socket 객체가 파라미터로 전달됩니다.
// 이 객체는 클라이언트 연결 정보를 담고 있으므로 address() 메소드를 호출하여 클라이언트의 IP 포트 정보를 확인할 수 있습니다.

server.on('request', function(req, res){
	console.log('클라이언트 요청이 들어왔습니다.');
	
	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	res.write("<!DOCTYPE html>");
	res.write("<html>");
	res.write("  <head>");
	res.write("    <title>응답 페이지</title>");
	res.write("  </head>");
	res.write("  <body>");
	res.write("    <h1>노드제이에스로부터의 응답 페이지</h1>");
	res.write("  </body>");
	res.write("</html>");
	res.end();
	
});

// 메소드 이름 													설명
// writeHead(statusCode [, statusMessage][, headers])		응답으로 보낼 헤더를 만듭니다.
// write(chunk[, encoding][, callback])						응답 본문(body) 데이터를 만듭니다. 여러 번 호출될 수 있습니다.
// end([data], ,[encoding][, callback])						클라이언트로 응답을 전송합니다. 콜백함 수가 지정되면 응답이 전송된 후 콜백 함수가 호출됩니다.

// 파일을 버퍼에 담아 두고 일부분만 읽어 응답 보내기

//클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
	console.log('클라이언트 요청이 들어왔습니다.');
	
	var filename = 'house.png';
	var infile = fs.createReadStream(filename, {flags: 'r'} );
	var filelength = 0;
	var curlength = 0;
	
	fs.stat(filename, function(err, stats) {
		filelength = stats.size;
	});
	
	// 헤더 쓰기
	res.writeHead(200, {"Content-Type": "image/png"});

	// 파일 내용을 스트림에서 읽어 본문 쓰기
	infile.on('readable', function() {
        var chunk;
        while (null !== (chunk = infile.read())) {
            console.log('읽어들인 데이터 크기 : %d 바이트', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
            	console.log('파일 부분쓰기 완료 : %d, 파일 크기 : %d', curlength, filelength);
            	if (curlength >= filelength) {
            		// 응답 전송하기
            		res.end();
            	}
            });
		}
	});
	
	// 파이프로 연결하여 알아서 처리되도록 하기
	//infile.pipe(res);
	  
});

// 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기
var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // 응답 처리
    var resData = '';
    res.on('data', function(chunk) {
    	resData += chunk;
    });
    
    res.on('end', function() {
	    console.log(resData);
	});
});

req.on('error', function(err) {
    console.log("에러 발생 : " + err.message);
});

// http 객체의 get() 메소드를 사용하면 다른 사이트에 요청을 보내고 응답을 받아 처리할 수 있습니다.
// get() 메소드의 첫 번째 파라미터는 다른 사이트의 정보를 담고 있는 객체입니다.
// 두 번째 파라미터는 콜백 함수 입니다.
// 응답 데이터를 받을 때는 data 이벤트와 end 이벤트로 처리하면 됩니다.
// 데이터를 받고 있는 상태에서는 data 이벤트가 발생하므로 이 때 받은 데이터 모두 resData 변수에 담아 둡니다.
// end 이벤트를 처리하면 응답 데이터를 모두 받은 후에 콘솔 창에 출력할 수 있습니다.

// 다른 서버로부터 응답을 받을 때는 data 이벤트가 발생합니다. 수신 데이터의 용량에 따라 data 이벤트는
// 한 번 또는 여러 번 발생할 수도 있습니다. 데이터 수신이 완료되면 end 이벤트가 발생합니다.

// POST 방식으로 요청할 경우에는 request() 메소드를 사용합니다. 이 request() 메소드는 get() 메소드와 사용 방식이 약간 다릅니다.
// 특히 요청을 보내려면 요청 헤더와 본문을 모두 직접 설정해야 합니다.
var http = require('http');

var opts = { 
		host : 'www.google.com',
		port : 80,
		method : 'POST',
		path : '/',
		headers : {}
};

var resData = '';
var req = http.request(opts, function(res){
	
	// 응답 처리
	res.on('data', function(chunk){
		resData += chunk;
	});
	
	res.on('end', function(){
		console.log(resData);
	});
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Content-Length'] = req.data.length;

req.on('error',function(err){
	console.log("오류 발생 : " + err.message);
});

// 요청 전송
req.write(req.data);
req.end();

// ### GET 방식과 POST 방식의 차이점
// 웹 서버에 요청을 보내는 방식 : GET / POST / PUT / DELETE 
// HTTP 요청 포맷을 보면 크게 헤더와 본문 부분을 누뉘는데 GET 방식은 헤더 부분에 요청 정보들을 넣어 보내고
// POST 방식은 본문 부분에 요청 정보를 넣어 보냅니다.
// 보안 이슈나 파일을 요청 정보를 넣어 보내는 하는 경우에는 POST 방식을 주로 사용

// 05-2 익스프레스로 웹 서버 만들기
// http 모듈만 사용해서 웹 서버를 구성할 때는 많은 것들을 직접 만들어야 합니다. 하지만 직접 만들어야 하는 코드가 많다면
// 시간과 노력도 많이 든다는 문제가 생깁니다. 이 문제를 해결하기 위해  만들어진 것이 익스프레스 입니다.
// 특히 익스프레스에서 제공하는 미들웨어와 라우터를 사용하면 각각의 기능을 훨씬 편리하게 구성 할 수 있습니다.

// 새로운 익스프레스 서버 만들기
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');

var app = express();

// all environments
// (1) process.env 객체에 PORT 속성이 있으면 그 속성을 사용하고, (2) 없으면 3000번 포트 번호를 사용합니다.
app.set('port', process.env.PORT || 3000);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// 익스프레스 서버 객체가 가지고 있는 주요 메소드들
// 메소드 이름							설명
// set(name, value) 				서버 설정을 위한 속성을 지정합니다. set() 메소드로 지정한 속성은 get() 메소드로 꺼내어 확인할 수 있습니다.
// get(name)						서버 설정을 위해 지정한 속성을 꺼내 옵니다.
// use([path], function[, function...]) 미들웨어 함수를 사용합니다.
// get([path], fucntion)			특정 패스로 요청된 정보를 처리합니다.

// set() 메소드는 웹 서버의 환경을 설정하는데 필요한 메소드입니다. 
// set() 메소드로 미리 정해진 이름
// 속성 이름							설명
// env								서버 모드를 설정합니다.
// views							뷰들이 들어 있는 폴더 또는 폴더 배열을 설정합니다.
// view engine						디폴트로 사용한 뷰 엔진을 설정합니다.


// view engine 속성은 뷰 엔진을 설정하는 것으로 ejs나 pug를 많이 사용합니다.
// 뷰 엔진은 클라이언트에 보낼 응답 웹 문서를 만들 때 사용되며 미리 탬플릿을 만들어두고 그 탬플릿을 사용해 응답 웹 문서를 만들어냅니다.
// 클라이언트에 응답을 보낼 때 사용하는 탬플릿은 여러 종류가 있는데, 그 종류를 결정 하는것이 바로 뷰 엔진입니다. 

// 미들웨어로 클라이언트에게 응답 보내기
// 익스프레스에서는 미들웨어 이외에 라우터도 사용하는데 미들웨어나 라우터는 하나의 독립된 기능을 가진 함수라고 생각하면 된다.
// 즉, 웹 요청과 응답에 관한 정보를 사용해 필요한 처리를 진행할 수 있도록 독립된 함수로 분리합니다.
// 이렇게 분리한 각각의 것들을 미들웨어라고 부릅니다.

// 각각의 미들웨어는 next() 메소드를 호출하여 그 다음 미둘웨어가 처리할 수 있도록 순서를 넘길 수 있습니다.

// 라우터는 클라이엍으위 요청 패스를 보고 이 요청 정보를 처리할 수 있는 곳으로 기능을 전달해 주는 역할을 합니다. 이러한 역할을 흔히 라우팅 이라고 부르는데, 
// 클라이언트의 요청 패스에 따라 각각을 담당하는 함수로 분리시키는 것입니다.


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>Express 서버에서 응답한 결과입니다.</h1>');

});

http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});

// 미들웨어 함수는 클라이언트 요청을 전다 받을 수 있습니다. 클라이언트 요청은 등록된 미들웨어 순서대로 통과하며, 요청 정보를 사용해 필요한 기능을 수행할 수 있습니다.
// 만약 첫 번째 미들웨어 함수인 '미들웨어 함수 #0' 안에서 end() 메소드를 호출하여 응답을 보내면 처리 과정은 완전히 끝납니다.

// 이렇듯 미들웨어를 직접 등록하여 사용하는 과정은 두 단계로 나눌 수 있습니다.
// 첫 번째 : use() 미소드를 이용해 미들웨어를 등록하는 것
// 두 번째 : 클라이언트 요청 정보를 처리하여 응답하는 것


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');
	
	req.user = 'mike';

	next();
});

app.use('/', function(req, res, next) {
	console.log('두번째 미들웨어에서 요청을 처리함.');
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');

});


http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});

// 미들웨어를 여러 가지 추가하고 싶다면 next() 함수를 이용해 다음 미들웨어를 실행할 수 있도록 설정해야 한다.
// 미들웨어 안에서는 기본적으로 요청 객체인 req와 응답 객체인 res 객체를 파라미터로 전달받아 사용할 수 있습니다.
// 미들웨어 함수를 호출한 app 객체도 참조할 수 있도록 req 객체의 속성으로 app 객체가 들어있습니다.

// 미들 웨어 함수를 보면 요청 객체와 응답 객체가 파라미터로 전달되며, 그 다음 미들웨어로 넘길 수 있는
// next() 함수 객체도 전달됩니다. 

// 익스프레스의 요청 객체와 응답 객체 알아보기
// 익스프레스에서 사용하는 요청 객체와 응답 객체는 http 모듈에서 사용하는 객체들과 같습니다.

// 추가로 사용할 수 있는 주요 메소드

// 메소드이름					설명
// send([body]) 			클라이언트에 응답 데이터를 보냅니다. 전달할 수 있는 데이터는 HTML 문자열, BUFFER 객체, JSON 객체, JSON 배열입니다.
// status(code)				HTTP 상태 코드를 반환합니다. 상태 코드는 end()나 send() 같은 전송 메소드를 추가로 호출해야 전송할 수 있습니다.
// sendStatus(statusCode) 	HTTP 상태 코드를 반환합니다. 상태 코드는 상태 메시지와 함께 전송됩니다.
// redirect([status], path)	웹 페이지 경로를 강제로 이동시킵니다.
// render(view, [,locals][,callback]) 뷰 엔진을 사용해 문서를 만든 후 전송합니다.

// status()와 sendStatis() 메소드를 사용하여 상태 코드를 전송할 수 있습니다. status() 메소드는 상태 코드를 작성하는 기능만 있으므로 
// 상태 코드를 전송하려면 send() 메소드를 추가로 호출해야 합니다.
// 예를 들어
// res.status(403).send('Forbidden');
// sendStatus()를 사용한다면 다음과 같이 작성하면 된다.
// res.sendStatus(403);


// 익스프레스 요청 객체에 추가한 헤더와 파라미터 알아보기
// 추가한 정보					설명
// query					클라이언트에서 GET 방식으로 전송한 요청 파라미터를 확인합니다.
// body						클라이언트에서 POST 방식으로 전송한 요청 파라미터를 확인합니다.
// 							단, body-parser와 같은 외장 모듈을 사용해야 합니다.
// 							예) req.body.name
// header(name)				헤더를 확인합니다.

// 클라이언트에서는 요청 파라미터를 함께 보낼 수 있습니다.
// 이 때 GET 방식으로 요청했다면 요청 파라미터들은 요청 객체의 query 객체 안에 들어갑니다.
// 예를 들면 
var paramName = req.query.name; // http://localhost:3000/?name=mike 일 경우


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');
	
	var userAgent = req.header('User-Agent');
	var paramName = req.param('name');
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	// 익스프레스 모듈을 사용하면 쉽게 요청 파라미터를 확인 할 수 있다.
	res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
	res.write('<div><p>Param name : ' + paramName + '</p></div>');
	res.end();
});


http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});

// 05-3 미들웨어 사용하기
// 다른 개발자들이 미리 만들어 둔 미들웨어 사용하기
// static 미들웨어 
// static 미들웨어는 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어 줍니다.
// 예를 들어 [public] 폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들고 싶다면 
 var static = require('server-static');
// 
 app.use(static(path.join(__dirname,'public')));
 
 // 만약 프로젝트 폴더 안에 
 // ExpressExample/public/index.html 이 들어있다면
 // 웹 브라우저에서 다음과 같은 주소로 바로 접근할 수 있습니다.
 // http://localhost:3000/index.html
 
 // body-parser 미들웨어
 // POST로 요청해을 때 요청 파라미터를 확인할 수 있도록 만들어 둔 body-parser 미들웨어에 대해 알아보자.
 // POST 방식으로 요청할 때는 본문인 본문 영역에 요청 파라미터가 들어 있게 되므로 요청 파라미터를 파싱하는 방법이 GET 방식과는 달라진다.
 



















