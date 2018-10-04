/**
 * ch02 노드 간단하게 살펴보기
 */

/**
 * 02-1 첫 번째 노드 프로젝트 만들기
 - 이클립스를 통해 콘솔창에 Hello World 찍히는 것 확인.
 */

/**
 *  02-2 콘솔에 로그 뿌리기
 console 객체는 전역 객체라고 부르며 필요할 때 코드의 어느 부분에서나 사용할 수 있습니다. 
 대표적인 전역 객체들은 다음과 같다.

console : 콘솔 창에 결과를 보여주는 객체
process : 프로세스의 실행에 대한 정보를 다루는 객체
exports : 모듈을 다루는 객체
**/

//console 객체에 정의된 log() 메소드를 호출하면서 문자열을 파라미터로 전달하면 그대로 출력됩니다. 
console.log('숫자 보여주기 : %d', 10);
console.log('문자열 보여주기 : %s ', '소녀시대');
console.log('JSON 객체 보여주기 : %j ', {name : 소녀시대} );

// & undefined 는 단순히 값이 존재하지 않는다고 생각하면 되고, null은 의도적으로 값을 비웠다고 생각하면 된다.

/*
 console 객체에는 자바 스크립트 객체의 속성들을 한꺼번에 출력해 주는 dir() 메소드, 그리고 코드 실행 시간을 측정할 수 있는 time()과 timeEnd() 메소드 등이 들어 있습니다.
dir(object) : 자바스크립트 객체의 속성들을 출력합니다.
time(id) : 실행 시간을 측정하기 위한 시작 시간을 기록합니다.
timeEnd(id) : 실행 시간을 측정하기 위한 끝 시간을 기록합니다.*/

var result = 0;

console.time('duration_sum');

for (var i = 1; i<= 1000; i++){
	result += i;
}

console.timeEnd('duration_sum');
console.log('1부터 1000 까지 더한 결과물 : %d', result);

console.log('현재 실행한 파일의 이름 : %s', __filename);
console.log('현재 실행한 파일의 패스 : %s', __dirname);

// __filename과 __dirname 변수를 전역 변수라고 부릅니다. 이 두개의 변수를 사용하면 node.exe를 사용해 실행한 파일의 이름과 패스를 쉽게 확인할 수 있습니다.
//__filename : 실행한 파일의 이름을 출력합니다. 파일의 전체 패스가 출력됩니다.
//__dirname : 실행한 파일이 들어 있는 폴더를 출력합니다. 폴더의 전체 패스가 출력됩니다.

var Person = {name: "소녀시대", age:20};
console.dir(Person);

//{속성 이름1 : 속성 값1, 속성 이름2 : 속성 값2, .....}

/**
 * 02-3 프로세스 객체 간단하게 살펴보기
*/
// process 객체는 프로그램을 실행했을 때 만들어지는 프로세스 정보를 다루는 객체입니다. 

// 속성 / 메소드 이름 		설명
// argv				프로세스를 실행할 때 전달되는 파라미터(매개변수) 정보
// env				환경 변수 정보
// exit()			프로세스를 끝내는 메소드

// argv 속성은 프로세스를 실행할 때 전달되는 파라미터 정보를 가지고 있습니다. 
console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);

// console 객체의 dir() 메소드를 사용하면 객체가 가지고 있는 속성을 그대로 출력할 수 있습니다.
// 콘솔에 표시된 결과에서 알 수 있듯이, process 객체에 들어 있는 argv 속성은 배열 객체이며 파일을 실행하기만 해도 node 명령과 파일패스가 파라미터 값으로 들어간다는 것을 알 수 있습니다.

if(process.argv.length > 2){
	console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index){
	console.log(index + ' : ', item);
});

// 만약 argv 속성에 들어있는 모든 값을 하나씩 출력하고 싶다면 forEach() 메소드를 사용합니다.
// forEach() 메소드는 배열 안에 들어 있는 각 아이템 값과 인덱스를 함께 전달하므로 배열 객체에 들어 있는 값들을 하나씩 확인하기에 좋습니다.

/**
 * 노드에서 모둘 사용하기
 */

// 하나의 함수 안에 모든 기능을 넣는 것보다 기능별로 여러 개의 함수로 나눈 후 필요한 함수만 가져다 사용하면 다른 곳에서의 함수를 재사용할 수 있기 때문에
// 훨씬 효율적으로 프로그램을 만들 수 있습니다. 또한 각각의 기능을 나누어 프로그램 관리가 더 쉬워집니다. 코드를 하나의 파일이 아니라 여러 개의 파일로 나누어
// 만들 때에도 이런 장점을 그대로 살릴 수 있습니다. 

// 메인 파일의 코드 중에서 독립적인 기능은 별도 파일로 분리 할 수 있으며, 메인 파일에서는 전체적인 실행 순서나 흐름만을 제어 합니다. 이렇게 분리된 파일을
// 노드에서는 모듈 이라고 부릅니다. 모듈이란 별도의 파일로 분리된 독립 기능의 모음이라서 모듈로 만들어 놓으면 다른 파일에서 모듈을 불러와 사용할 수 있습니다.

// 각각의 기능을 분리시킬 때는 단순히 별도의 파일에 코드를 나누어 놓는다고 끝나는 것은 아닙니다. 분리 되어 있는 모듈 파일을 불러와서 사용할 수 있는 방법도 함께 만들어 주어야 합니다.
// 노드는 CommonJs의 표준 스팩을 따라 머듈을 사용할 수 있게 합니다. 이 과정에서 exports 전역 객체를 사용합니다.

// 모듈을 만들 때는 module.js 처럼 별도의 자바스크립트 파일을 만든 후 그 코드에서 exports 객체를 사용합니다.
// exports 객체의 속성으로 변수나 함수를 지정하면 그 속성을 main.js와 같은 메인 자바스크립트 파일에서 불러와 사용할 수 있습니다.

// 모듈을 불러 올 때는 require() 메소드를 사용하여, 모듈로 만들어 둔 파일의 이름을 이 메소드의 파라미터로 전달합니다. require() 메소드를 호출하면 모듈 객체가 반환되는데, 모듈에서
// exports 객체에 설정한 속성들은 이 모듈 객체를 통해 접근할 수 있습니다.

// 여기서 주의할 점은 exports 외에 module.exports를 사용할 수도 있다는 것입니다. exports에는 속성을 추가할 수 있어 여러 개의 변수나 함수를 각각의 속성으로 추가할 수 있습니다.
// 이에 반해 module.exports에는 하나의 변수나 함수 또는 객체를 직접 할당합니다. 

// calc.js
exports.add = function(a, b){
	return a+b;
}

// app.js
var calc = require('./calc');
console.log('모듈로 분리한 후 - cacl.add 함수 호출 결과 : %d' , calc.add(10,10));

// 이렇게 만든 app.js 파일은 메인 파일이 되며, calc.js 모듈 파일을 불러와서 사용합니다. calc.js 파일을 모듈로 불러오기 위해 먼저 require() 함수를 호출합니다.
// 이 떄 require() 함수의 파라미터로 모듈 파일의 이름을 전달하는데, 파일 이름 전체를 다 사용하지 않고 확장자를 뺀 calc 라는 이름만 사용합니다.

// #### 모듈의 이름만 지정하면 해당 파일을 찾아 부르지만 만약 파일이 없다면 폴더 이름을 찾아 그 안에 있는 파일을 불러들인다.
// 1. require('./calc') 호출
// 2. calc.js 찾아보고 없으면 calc 폴더가 있는지 확인.
// 3. calc 폴더가 있다면  그 안에 있는 index.js 파일을 불러들임

// 모든 파일을 만들 때 사용한 exports 객체는 매인 파일에서 모듈 파일을 불러들일 때 반환되므로 이 객체를 변수에 할당하여 
// 사용 할 수 있다고 생각하면 좀 더 쉽게 이해할 수 있습니다. 즉, 여기에서 메인 파일에 정의한 calc 변수가 모듈 파일에서 사용한 exports 겍체와 같습니다.

// # module.epxorts로 메인 파일에 더하기 함수 호출하기
var calc = {};
calc.add = function(a, b){
	return a+b;
};
module.exports = calc;

// app.js
var cal2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', cal2.add(10, 10));

// 외장 모듈 사용하기
// 다른 사람이 만들어 둔 모듈을 외장 모듈이라고 합니다.

// 시스템 환경 변수에 접근할 수 있는 모듈의 이름은 nconf이며, 이 모듈은 설정과 관련된 유용한 기능뿐 아니라 시스템 환경 변수를 접근하는 기능도 포함하고 있다.
var nconf = require('nconf');
nconf.env();

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));

// npm 패키지를 사용하면 다른 사람이 만들어 올려놓은 패키지를 다운로드 하여 설치할 수 있습니다.
// ##### npm 역할은 무엇인가요?
// npm은 Node Package Manager의 약자로 노드의 패키지를 사용할 수 있도록 설치 및 삭제 등을 지원하는 프로그램입니다.
// 패키지는 여러분이 만들어 본 모듈에 몇 가지 정보를 더 넣은 것이라고 할 수 있으며, 보통 패키지를 만든 후 다른 사람이 사용할 수 있도록 인터넷에 올려 공유합니다.
// npm 프로그램은 이렇게 인터넷에 올려 공유하는 노드 패키지를 다운로드하여 설치할 수 있도록 도와줍니다.

// npm으로 설치한 패키지는 그 폴더 안에 만들어진 [node_modules] 폴더 안에 설치됩니다. 
// 만약 모든 프로젝트에 외부 패키지를 적용하고 싶다면 상위 폴더인 [brackets-node.js] 폴더로 옮기면 간단하게 해결됩니다.
// 또는 패키지를 설치할 때부터 상위 폴더에 설치하면 됩니다. 메인 파일이 실행될 때는 먼저 현재 폴더에 [node_modules] 폴더가 있는지 확인하고 만약 없다면
// 상위 폴더를 검색합니다.

// 노드에서는 외부 패키지의 수만큼 npm 명령을 입력해야 하는 번거로움을 없앨 수 있도록 package.json 파일 안에 설치한 패키지들의 정보를 넣어 둘 수 있습니다.
// packge.json 을 만들려면 다음과 같이 입력합니다.
npm.init

// 설치한 패키지의 정보가 모두 들어간 package.json 파일이 만들어 지고, 이 프로젝트에서 사용한 모듈을 다른 pc에서 그대로 사용하고 싶다면 package.json 파일만 다른 pc로 옮긴 후
// 다음처럼 입력하면 모든 패키지가 한꺼번에 설치됩니다.
npm.install

// 시스템 정보를 알려주는 os 모듈

// 메소드 이름 					설명
// hostname()				운영체제의 호스트 이름을 알려 줍니다.
// totalmem()				시스템의 전체 메모리 용량을 알려 줍니다.
// freemem()				시스템에서 사용 가능한 메모리 용량을 알려 줍니다.
// cpus()					CPU 정보를 알려 줍니다.
// networkInterfaces()		네트워크 인터페이스 정보를 담은 배열 객체를 반환합니다.

var os = require('os');

console.log('시스템의 hostname : %s', os.hostname());
console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem());
console.log('시스템의 CPU 정보 \n');
console.dir(os.cpus());
console.log('시스템의 네트워크 인터페이스 정보');
console.dir(os.networkInterfaces());

// 파일 패스를 다루는 path 모듈

// 메소드 이름					설명
// join()					여러 개의 이름들을 모두 합쳐 하나의 파일 패스로 만들어 줍니다. 
//							파일 패스를 완성할 때 구분자 등을 알아서 조정합니다.
// dirname()				파일 패스에서 디렉터리 이름을 반환합니다.
// basename()				파일 패스에서 파일의 확장자를 제외한 이름을 반환합니다.
// extname()				파일 패스에서 파일의 확장자를 반환합니다.

var path = require('path');

// 디렉터리 이름 합치기
var directories = ["users", "mike", "docks"];
var docsDirectory = directories.join(path.sep); // users\mike\docs
console.log('문서 디렉터리 : %s', docsDirectory);

// 디렉터리 이름과 파일 이름 합치기
var curPath = path.join('/Users/mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath); 


// 패스에서 디렉터리, 파일 이름, 확장자 구별하기
var filename = "C:\\Users\\mike\\nopad.exe";
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('디렉터리 : %s, 파일 이름 : %s, 확장자 : %s', dirname, basename, extname);






