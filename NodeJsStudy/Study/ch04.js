/**
 * ch04 : 노드의 기본 기능 알아보기
 */

// 주소 문자열과 요청 파라미터 다루기

// 웹 사이트에서 접속하기 위한 사이트 주소 정보는 노드에서 URL 객체로 만들 수 있습니다.
// 예를들어 : https://www.google.co.kr?/?gws_rd=ssl#newwindow=1&q=actor
// 요청파라미터를 구별하기 위해 ? 기호를 기준으로 앞에 있는 문자열과 뒤에 있는 문자열을 분리하는 경우가 많습니다.

// 이 작업을 쉽게 하기 위해 사용하는 모듈이 url 모듈입니다.

// protocol : 'https'
// host : 'www.google.co.kr'
// query : 'gws_rd=ssl#newwindow=1&q=actor'

// 주소 문자열을 URL 객체로 변환하기
// 메소드 이름 				설명
// parse()				주소 문자열을 파싱하여 URL 객체로 만들어 줍니다.
// format()				URL 객체를 주소 문자열로 변환합니다.

var url = require('url');

// 주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%8D%94+%EC%98%A4%ED%94%BC%EC%8A%A4&oquery=%EC%9D%B4%ED%81%B4%EB%A6%BD%EC%8A%A4+git&tqi=TJUaplpySDlssvNS9ewssssstG4-042950');

// 주소 문자열을 URL 객체로 만들기
var curStr = url.format(curURL);

console.log('주소 문자열 : %s' , curStr);
console.dir(curURL);

// 요청 파라미터 확인하기
// 요청 파라미터는 & 기호로 구분되는데 querystring 모듈을 사용하면 요청 파라미터를 쉽게 분리할 수 있습니다.

// 요청 파라미터 구분하기
var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));

// parse() 메소드는 요청 파라미터 문자열을 파싱하여 객체로 만들어 줍니다.
// 이 객체에는 각각의 요청 파라미터들이 속성으로 추가되어 있어 속성 값을 참조하면 각각의 요청 파라미터를 사용할 수 있습니다.
// stringify() 메소드는 객체 안에 들어 있는 요청 파라미터를 다시 하나의 문자열로 바꿀 때 사용합니다.

// 메소드 이름 				설명
// parse()				요청파라미터 문자열을 파싱하여 요청 파라미터 객체로 만들어 줍니다.
// stringify()			요청 파라미터 객체를 문자열로 반환합니다.

// 이벤트 이해하기
// 이벤트 보내고 받기
// 노드의 객체는 EventEmiiter를 상속받을 수 있으며, 상속 받은 후에는 EventEmitter 객체의 on() 과 emit() 메소드를 사용할 수 있습니다.
// on() 메소드는 이벤트가 전달될 객체에 이벤트 리스너를 설정하는 역할을 하는데 이 리스너 함수는 객체로 전달된 이벤트를 받아 처리할 수 있습니다.
// on() 메소드 이외에 once() 메소드를 사용할 수도 있습니다. once() 메소드를 사용할 때는 이벤트 리스너 함수가 한 번이라고 실행하고 나면 자동으로
// 제거 되므로 이벤트를 딱 한번만 받아서 처리할 수 있습니다.

// 메소드 이름					설명
// on(event, listener) 		지정한 이벤트의 리스너를 추가합니다.
// once(event, listenr)		지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로
//							리스너가 제거됩니다.
// removeListenr(event, listener) 지정한 이벤트에 대한 리스너를 제거합니다.

process.on('exit', function(){
	console.log('exit 이벤트 발생');
});

setTimeout(function(){
	console.log('2초 후에 시스템 종료 시도됨.');
	process.exit();
	
}, 2000);

// process 객체는 노드에서 언제든지 사용할 수 있는 객체인데 이미 내부적으로 EventEmiiter를 상속받도록 만들어져 있어서 on()과 emit()메소드를 바로 사용할 수 있습니다.
// process 객체의 on() 메소드를 호출하면서 이벤트 이름을 exit로 지정하면 프로세스가 끝날 때를 알 수 있습니다.

// 우리가 직접 만든 이벤트
process.on('tick', function(count){
	console.log('tick 이벤트 발생함 : %s', count);
});

setTimeout(function(){
	console.log('2초 후에 tick 이벤트 전달 시도함');
	
	process.emit('tick', '2');
}, 2000);


// 계산기 객체를 모듈로 만들어 보기
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function(){
	var self = this;
	
	this.on('stop', function(){
		console.log('Calc에 stop event 전달됨');
	});
};

util.inherits(Calc, EventEmiiter);

Calc.prototype.add = function(a, b){
	return a + b;
}

module.exports = Calc;
module.exports.title = 'calculator';

// Calc 객체는 계산기 객체로 function 키워드를 사용해 프로토타입 객체로 만듭니다.
// 상속은 util 모듈에 있는 inherits() 메소드를 사용하면 쉽게 정의할 수 있습니다. 코드의 가장 위쪽에서 require() 메소드를 호출하여
// util 모듈을 불러 왔기 때문에 util.inherits() 메소드를 호출하는 코드를 넣어도 오류는 발생하지 않습니다.

var Calc = require('./calc3');

var calc = new Calc();
calc.emit('emit');

console.log(Calc.title + '에 stop 이벤트를 전달함');
// Calc 객체는 프로토타입 객체로 계산기 기능을 정의한 것이므로 new 연산자를 이용해 인스턴스 객체를 만듭니다.
// Calc 객체가 EventEmiiter를 상속하므로 인스턴스 객체의 emit() 메소드를 호출하여 stop 이벤트를 전달합니다.

// 04-3 파일 다루기
// 노드의 파일 시스템은 파일을 다루는 기능과 디렉터리를 다루는 기능으로 구성되어 있으며, 동기식 IO와 비동기식 IO 기능을 함께 제공합니다.
// 동기식 IO는 파일 작업이 끝날 때까지 대기하며, 비동기식 IO는 파일 작업을 요청만 하고 그 다음 작업을 바로 수행합니다. 
// 동기식 IO와 비동기식 IO를 구별하기 위해 동기식 IO 메소드는 Sync라는 단어를 붙입니다.

// 파일을 읽어 들이거나 파일에 쓰기
var fs = require('fs');

// 파일을 동기식 IO로 읽어 들입니다.
var data = fs.readFileSync('./packge.json', 'utf8');

// 읽어 들인 데이터를 출력합니다.
console.log(data);

// 비동기식
var fs = require('fs');

// 파일을 비동기식 IO로 읽어 들입니다.
fs.readFile('./package.json', 'utf8', function(err, data){
	// 읽어 들인 데이터를 출력합니다.
	console.log(data);
});

// 두 개의 파라미터 err 와 data를 전달받아서 오류가 발생했는지 아니면 제대로 실행했는지를 알 수 있습니다.
// 오류가 발생하면 err에 오류 데이터가 들어가고 그렇지 않으면 err 변수의 값이 null이 됩니다. 
// 그러므로 일반적으로 첫 번째 파라미터인 err가 null인지를 체크하는 코드를 사용한 후 문제가 없으면 파일 읽기에 성공한 것을 처리합니다.

// fs 모듈
// 메소드 이름											설명
// readFile(filename, [encoding], [callback])		비동기식 IO로 파일을 읽어 들입니다.
// readFileSync(filename, [encoding])				동기식 IO로 파일을 읽어 들입니다.
// writeFile(filename, data, encoding='utf8', [callback]) 비동기식 IO로 파일을 씁니다.
// writeFileSync(filename, data, encoding='utf8')	동기식 IO로 파일을 씁니다.

var fs = require('fs');

// 파일에 데이터를 씁니다.
fs.writeFile('./output.txt', 'Hello World!', function(err){
	if(err){
		console.log('Error : ' + err);
	}
	
	console.log('output.txt 파일에 데이터 쓰기 완료.');
});

// 파일을 직접 열고 닫으면서 읽거나 쓰기
// 메소드 이름 												 설명
// open(path, flags, [mode], [callback])				  파일을 엽니다.
// read(fd, buffer, offset, length, position, [callback]) 지정한 부분의 파일 내용을 읽어 들입니다.
// write(fd, buffer, offset, length, position, [callback]) 파일의 지정한 부분에 데이터를 씁니다.
// close(fd, [callback]) 								 파일을 닫아 줍니다.

var fs = require('fs');

// 파일에 데이터를 씁니다.
fs.open('./output.txt', 'w', function(err, fd){
	if(err) throw err;
	
	var buf = new Buffer('안녕!\n');
	fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){
		if(err) throw err;
		console.log(err,written,buffer);
		
		fs.close(fd, function(){
			console.log('파일 열고 데이터 쓰고 파일 닫기 완료');
		});
	});
	
});

// open -> write -> close
// 만들어진 파일을 읽어 들이는 코드
var fs = require('fs');

// 파일에서 데이터를 읽어 들입니다.
fs.open('./output.txt','r',function(err, fd){
	if(err) throw err;
	
	var buf = new Buffer(10);
	console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
	
	fs.read(fd, buf, 0, buf.length, null, function(err, byteRead, buffer){
		if(err) throw err;
		
		var inStr = buffer.toString('utf8', 0, bytesRead);
		console.log('파일에서 읽은 데이터 : %s', inStr);
		
		console.log(err, bytesRead, buffer);
		
		fs.close(fd, function(){
			console.log('output.txt 파일을 열고 읽기 완료.');
		});
	});
	
});


// Buffer 객체는 바이너리 데이터를 읽고 쓰는 데 사용합니다. 새로운 버퍼 객체를 만들기 위해서는 new 연산자를 사용하며, 그 안에 들어갈 바이트 데이터의 크기만 지정하면 됩니다.
// 버퍼 객체를 크기만 지정하여 만든 후 문자열을 씁니다.
var output = '안녕 11';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');

console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString());

// 버퍼 객체를 문자열을 이용해 만듭니다.
var buffer2 = new Buffer('안녕2!', 'utf8');
console.log('두 번째 버퍼의 문자열 : %s' , buffer2.toString());

// 타입을 확인합니다.
console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어 있는 문자열 데이터를 문자열 변수로 만듭니다.
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, byteLen);
var str2 = buffer2.toString('utf8');


// 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사합니다.
buffer1.copy(buffer2, 0, 0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf8'));

// 두 개의 버퍼를 붙여 줍니다.
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));

// 스트림 단위로 파일 읽고 쓰기
// 파일을 읽거나 쓸 때는 데이터 단위가 아닌 스트림 단위로 처리할 수도 있습니다.
// 스트림은 데이터가 전달되는 통로와 같은 개념입니다. 파일에서 읽을 때는 createReadStream(), 파일을 쓸 때는 createWriteStream() 메소드로 스트림 객체를
// 만든 후 데이터를 읽고 쓰게 됩니다.
// 메소드 이름								설명
// createReadStream(path, [options])	파일을 읽기 위한 스트림 객체를 만듭니다.
// createWriteStream(path, [options])	파일을 쓰기 위한 스트림 객체를 만듭니다.

var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags : 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags : 'w'});

infile.on('data', function(data){
	console.log('읽어 들인 데이터', data);
	outfile.write(data);
});

infile.on('end', function(){
	console.log('파일 읽기 종료');
	outfile.end(function(){
		console.log('파일 쓰기 종료.');
	});
});

// 위의 기능은 두 개의 스트림을 붙여 주면 더 간단하게 만들 수 있다. pipe() 메소드는 두 개의 스트림을 붙여 주는 역할을 합니다.
// ReadStream 타입의 객체와 WriteStream 타입의 객체를 붙여 주면 스트림 간에 데이터를 알아서 전달합니다. 
var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists){
	if(exists){
		fs.unlink(outname, function(err){
			if(err) throw err;
			console.log('기존 파일 [ ' + outname + '] 삭제함');
		});
	}
	
	var infile = fs.createReadStream(inname, {flags : 'r'});
	var outfile = fs.createWriteStream(outname, {flags : 'w'});
	infile.pipe(outfile);
});

// unlink() 메소드는 기존의 파일이 있으면 삭제하는 메소드이다.

// http 모듈로 요청받은 파일 내용을 읽고 응답하기
var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req, res){
	// 파일을 읽어 응답 스트림과 pipe()로 연결합니다
	// 읽기 스트림
	var instream = fs.createReadStream('./output.txt');
	// 쓰기 스트림 -> 클라이언트(웹 브라우저)
	instream.pipe(res);
});

server.listen(7001, '127.0.0.1');

// fs 모듈로 새 디렉터리 만들고 삭제하기
// fs 모듈은 그 밖에도 파일과 디렉터리를 다루는 여러가지 메소드를 포함하고 있습니다.
var fs = require('fs');
fs.mkdir('./docs', 0666, function(err){
	if(err) throw err;
	console.log('새로운 docs 폴더를 만들었습니다.');
	
	fs.rmdir('./docs', function(err){
		if(err) throw err;
		console.log('docs 폴더를 삭제했습니다.');
	});
});

// 로그 파일 남기기
// console 객체의 log() 또는 error() 메소드 등을 호출하면 로그를 출력할 수 있습니다.
// winston 모듈

var winston = require('winston'); // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file'); // 로그 일별 처리 모듈
var moment = require('moment'); // 시간 처리 모듈

function timeStampFormat(){
	return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
	// ex) '2016-05-01 20:14:28.500 +0900'
}

var logger = new (winston.Logger)({
	transports : [
		new (winstonDaily)({
			name : 'info-file',
			filename : './log/server',
			datePattern : '_yyyy-MM-dd.log',
			colorize : false,
			maxsize : 50000000,
			maxFiles : 1000,
			level : 'info',
			showLevel : true,
			json : false,
			timestamp : timeStampFormat
		}),
		new (winston.transports.Console)({
			name : 'debug-console',
			colorize : true,
			level : 'debug',
			showLevel : true,
			json : false,
			timestamp : timeStampFormat
		})
	],
	exceptionHandler : [
		new (winstonDaily)({
			name : 'exception-file',
			filename : './log/exception',
			datePattern : '_yyyy-MM-dd.log',
			colorize : false,
			maxsize : 50000000,
			maxFiles : 1000,
			level : 'error',
			showLevel : true,
			json : false,
			timestamp : timeStampFormat
		}),
		new (winston.transports.Console)({
			name : 'exception-console',
			colorize : true,
			level : 'debug',
			showLevel : true,
			json : false,
			timestamp : timeStampFormat
		})
	]
});

// winston 모듈로 만드는 로거(Logger, 로그를 출력하는 객체를 말할 떄 사용하는 용어) 
// 이름이 info-file인 설정 정보는 매일 새로운 파일에 로그를 기록하도록 설정하고, info 수준의 로그만 기록하도록 설정
// 로그 파일 크기가 50MB를 넘어가면 자동으로 새로운 파일로 생성되며, 이 때 자동으로 분리되어 생성되는 파일 개수는 최대 1000개 까지 가능
// 콘솔 창에 출력되는 로그는 DEBUG 수준까지 출력되도록 설정 , 컬로도

// ##### 로그 수준(Log Level) 
// debug : 0 > info : 1 > notice : 2 > warning : 3 > error : 4 > crit : 5 > alert : 6 > emerge : 7

// npm install winston --save
// npm install winston-daily-rotate-file --save
// npm install moment --save




