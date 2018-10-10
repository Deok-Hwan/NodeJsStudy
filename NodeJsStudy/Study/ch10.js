/**
 * ch10 채팅 서버 만들기
 */

// 10-1 Socket.io 사용하기
// socket.io를 사용하기 위해 모듈 설치하기
//

// npm install socket.io --save
// socket.io를 사용하려면 cors 모듈도 설치되어 있어야 합니다.
// CORS란,  클라이언트에서 AjAX를 사용해 데이터를 가져올 때 현재 보고 있는 브라우저의 웹 문서를 제공한 웹 서버 이외에 다른 웹 서버에서는
// 접속할 수 없는 제약이 풀립니다. 노드에서 CORS 모듈을 설치하고 미들웨어로 사용하면 이 제약을 간단히 해결할 수 있습니다.


// sokcet.io 모듈은 기본적으로 웹 소켓을 사용하지만 웹 브라우저가 웹 소켓을 지원하지 않는 경우에는 XHR을 사용할 수도 있으므로
// CORS표준을 사용하지 않으면 다른 웹 서버에 접속할 수 없게 됩니다.

// npm install cors --save

// socket.io 모듈을 사용하기 위해 listen() 메소드를 호출했을 때 socket.io 객체가 반환됩니다.
// 이 객체에 들어있는 sockets 객체는 클라이언트가 접속하거나 데이터를 전송했을 때 이벤트를 발생시킵니다.
// 이벤트를 처리할 함수를 on() 메소드로 등록하면 이벤트 데이터를 받았을 때 필요한 기능을 실행할 수 있습니다.

// 클라이언트에서 웹 소켓으로 연결했을 때 발생하는 가장 기본적인 이벤트는 connection 이벤트입니다.

// 클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket){
	
	// HOST , PORT 정보 속성으로 추가
	socket.remoteAddres = socket.request.connection._peername.address;
	socket.remotePort = Socket.connection._peername.port;
	
});

// socket.io 모듈은 메시지를 보내고 받을 때 이벤트 처리 방식을 사용합니다.
// 이벤트를 처리할 때와 같은 코드를 사용하여 메시지를 주고 받을 수 있다는 뜻입니다.
// on()메소드로 이벤트 처리 함수를 등록하면 전달받은 데이터를 처리하도록 만들 수 있습니다.
// 데이터를 보낼 때는 emit() 메소드를 사용해서 이벤트를 일으킵니다.

// echo
// socket.on('con




