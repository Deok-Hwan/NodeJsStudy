/**
 * ch03 자바스크립트 기본 정리
 */


//자바스크립트의 자료형

// 자료형				설명
// Boolean			[기본 자료형] true와 false의 두 가지 값을 가지는 자료형
// Number			[기본 자료형] 정수나 부동소수 값을 가지는 자료형 - 무한대(Number.MIN_VALUE로 확인)
// String			[기본 자료형] 문자열 값을 가지는 자료형
// undefined		값을 할당하지 않는 변수의 값
// null				존재하지 않는 값을 가리키는 값
// Object			객체를 값으로 가지는 자료형 , 객체는 속성들을 담고 있는 가방으로 볼 수 있으며, 대표적인 객체로 Array나 Date를 들 수 있음

var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';
Person.mobile = '010-1000-1000';

console.log('나이 : %d', Person.age);
console.log('이름 : %d', Person.name);
console.log('전화 : %s', Person['mobile']);

// 함수를 만드는 2가지 방법
function add(a, b){
	return a + b;
}

var result = add(10, 10);

console.log('더하기 (10, 10) : %d',result);

var add = function (a,b){
	return a+b;
};

var result1 = add(10,10);

console.log('더하기 (10, 10) : %d',result1);

// 객체 안에 함수 추가하기
var Person = {
		age : 20,
		name : '소녀시대',
		add : function(a, b){
			return a+b;
		}
};

console.log('더하기 : %d', Person.add(10, 10));

// 배열 이해하기

var Users = [{name : '소녀시대', age:20}, {name : '걸스데이', age : 22}];

Users.push({name : '티아라', age : 23});

console.log('사용자 수 : %d', Users.length);
console.log('첫 번째 사용자 이름 : %s', Users[0].name);

// 배열의 모든 요소 하나씩 확인하기
var Users = [{name : '소녀시대', age : 20}, {name : '걸스데이', age : 22}, {name : '티아라', age:23}];

for (var i = 0; i < Users.length; i++) {
	console.log('배열 요소 #' + i + ' : %s', Users[i].name);
}

Users.forEach(function(item, index){
	console.log('배열 요소 #' + index + '%s' , item.name);
});

// 배열에 값 추가 및 삭제하기

// 속성 / 메소드 이름 				설명
// push(object)				배열의 끝에 요소를 추가합니다.
// pop()					배열의 끝에 있는 요소를 삭제합니다.
// unshift()				배열의 앞에 요소를 추가합니다.
// shift()					배열의 앞에 있는 요소를 삭제합니다.
// splice(index, removeCount,[Object])	여러 개의 객체를 요소로 추가하거나 삭제합니다.
// slice(index, copyCount)		여러 개의 요소를 잘라내어 새로운 배열 객체로 만듭니다.

// 배열의 중간에 있는 요소를 삭제하기
var Users = [{name : '소녀시대', age : 20}, {name : '걸스데이', age : 22}, {name:'티아라', age :23}];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

delete Users[1];
console.log('delete 키워드로 배열 요소 삭제 후 ');
console.dir(Users);

// delete는 공간을 빈 공간으로 남기고 데이터만 삭제한다.
// 따라서 완전히 삭제하기 위해서는 splice() 메소드를 사용해야 한다.
// splice() 메소드를 호출할 때 전달하는 첫 번째 파라미터는 인덱스 값으로 배열의 몇 번째 요소부터 처리 할 것인지를 지정합니다.
// 두 번째 파라미터는 삭제할 요소의 개수를 지정합니다. 만약 5개의 객체가 들어 있는 Users 배열에서 3번째와 4번째를 삭제하고자 한다면
Users.splice(2,2);

// splice는 여러 개의 Object를 추가 하거나 삭제할 수 있다.
// 인덱스 1에 추가
Users.splice(1, 0, {name: '에프터스쿨', age : 25});

// 인덱스 2삭제
Users.splice(2, 1);

// slice() 메소드로 배열 일부 요소 복사하여 새로운 배열 만들기
// slice() 메소드는 배열의 일부 요소들을 복사하여 새로운 배열을 만들어 주는 것
// slice() 메소드에 전달하는 파라미터는 두 개입니다. 첫 번째는 복사할 요소의 시작 위치이며 두 번째는 끝 위치입니다.
var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}, {name:'에프터스쿨', age:25}];

console.log('배열 요소의 수 : %d ', Users.length);
console.log('원본 Users');

console.dir(Users);

var Users2 = Users.slice(1, 3);

console.log('slice()로 잘라낸 후 Users2');
console.dir(Users2);

var Users3 = Users2.slice(1);

console.log('slice()로 잘라낸 후 Users3');
console.dir(Users3);

// 03-3 콜백 함수 이해하기
function add(a, b, callback){
	var result = a + b;
	callback(result);
}
// 더하기 함수를 실행하는데 시간이 걸릴 수 있기 때문에 그 다음 코드를 실행하고
// 연산이 끝났을 때 파라미터로 전달한 함수가 실행될 수 있다면 그 시점에 결과를 처리할 수 있으므로
// 효율적인 프로그램을 만들 수 있다.
add(10, 10, function(result){
	console.log('파라미터로 전달된 콜백 함수 호출됨.');
	console.log('더하기 (10, 10)의 결과 : %d', result);
});

// 함수 안에서 값을 반환할 때 새로운 함수르르 만들어 반환하는 방법
function add(a, b, callback){
	var result = a+b;
	callback(result);
	
	var history = function(){
		return a + '+' + b + ' = ' + result;
	};
	
	return history;
}

// 어떤 함수를 실행했을 때 또 다른 함수를 반환받으면 반환받은 함수를 그대로 실행할 수 있습니다.
// 이렇게 만들면 하나의 함수를 샐행했으 때 추가적인 결과를 얻거나 또는 추가 작업을 할 수 있습니다.


function add(a, b, callback){
	var result = a + b;
	callback(result);
	
	var history = function() {
		return a + ' + ' + b + ' = ' + result ;
	}
}

var add_history = add(10, 10, function(result){
	console.log('파라미터로 전달된 콜백 함수 호출됨.');
	console.log('더하기 (10, 10)의 결과 : %d', result);
});

// add 함수 안에 history 함수를 몇 번이나 실행했는지 알 수 있도록 count 변수를 만들었다면 변수는
// add 함수에서 반환된 함수 안에서 계속 접근할 수 있습니다.

function add(a, b, callback){
	var result = a + b;
	callback(result);
	
	var count = 0;
	var history = function(){
		count ++;
		return count + ' : ' + a + ' + ' + ' b ' + ' = ' + result;
	}
	return history;
}

var add_history = add(10, 10, function(result){
	console.log('파라미터로 전달된 콜백 함수 호출됨.');
	console.log('더하기 (10, 10)의 결과 : %d', result);
});

console.log('결과 값을 받은 함수 실행 결과 : ' +add_history());
console.log('결과 값을 받은 함수 실행 결과 : ' +add_history());
console.log('결과 값을 받은 함수 실행 결과 : ' +add_history());

// 반환됨 함수를 반복해서 실행하면 count 변수의 값이 증가한다.
// 반환됨 history 함수가 실행될 때는 이미 add 함수가 메모리에서 접근할 수 없는 상태가 된 다음입니다.
// 따라서 history 함수가 실행될 때는 add 함수 안에 만들어진 count 변수도 같이 접근할 수 없어야 합니다.
// 하지만 이와 같이 함수 안에서 새로운 함수를 만들어 반환하는 경우에는 예외적으로 변수 접근을 허용합니다.
// 이것을 클로저 라고 부릅니다.

// 프로토타입 객체 만들기

function Person(name, age){
	this.name = name;
	this.age =age;
}

Person.prototype.walk = function(speed){
	console.log(speed + ' km 속도로 걸어갑니다.');
}

var person01 = new Person('소녀시대', 20);
var person02 = new Person('걸스데이', 22);

console.log(person01.name + '객체의 walk(10)을 호출합니다.');
person01.walk(10);

// Person 프로토타입 객체를 만들려면 먼저 Person 함수를 정의합니다. 
// 자바스크리브에서는 함수도 객체이기 때문에 이 함수는 객체의 역할을 할 수 있습니다.
// 함수 중에서 new 연산자로 호출되는 함수는 객체를 만들기 위한 함수로 분류되며, 이러한 함수를 생성자 라고 합니다.
// 따라서 객체 안에 name 속성을 만들거나 name 속성에 접근하고 싶다면 this를 사용합니다.함수의 파라미터로 전달받은
// name과 age 속성을 이용해서 객체인 this에 name과 age 속성을 추가합니다.

// Person 객체에 walk 함수를 속성으로 추가하고 싶다면 Person.walk = function() {...} 과 같은 형태가 아니라 Person.prototype.walk = function(){...} 과 같은 형태로 만듭니다.
// 이것은 Person 객체가 실제 데이터를 담기 위해 만들어진 것이 아니라 다른 인스턴스 객체를 만들기 위한 원형 틀로 만들어 졌기 때문입니다. 

// Person 객체 안에 있는 prototype 속성도 객체로 만든 것인데, Person 함수가 만들어질 때 자동으로 만들어집니다.
// 이 prototype 객체는 Person 객체 자신을 가리키도록 되어 있어 다음의 두 코드는 같은 결과를 보여줍니다.

// Person.walk = function(){...}
// Person.prototype.walk = function() {...}

// 다시 말해, 이 두 가지 코드 모두 Person이라는 틀로 만들어 낸 인스턴스 객체에서 walk 함수를 호출할 수 있습니다.
// 다만 prototype 속성으로 추가하면 인스턴스 객체를 만들 때 메모리를 효율적으로 관리할 수 있다는 점이 서로 다릅니다.

// 새로운 인스턴스 객체들을 만들도록 정의한 Person 객체를 프로토타입 객체라고 부릅니다.





