/**
 * ch07 모듈화 방법 자세히 살펴보기
 */

// 07-1 모듈화 방법 자세히 살펴보기
// exports 전역 변수는 어디에서나 접근할 수 있게 저의된 것이고 속성도 추가할 수 있습니다. 새로운 파일을 만들고 그 안에서 exports 전역 변수에 속성을
// 추가하면 다른 파일에서도 exports 전역 변수의 속성을 참조할 수 있습니다. 예를 들어, 사용자 정보를 확인하려고 만든 기능을 별도의 user1.js 자바스크립트 파일로 
// 분리한 후 모듈로 구성하려면 getUser() 함수와 group 객체를 exports 속성으로 추가 해야 합니다.
// 이렇게 만든 모듈은 require() 메소드로 불러 들일 수 있습니다.

// exports 객체 속성으로 함수 추가
exports.getUser = function() {
	return { id : 'test01' , name : '소녀시대'};
}

// exports 객체 속성으로 객체 추가
exports.group = { id : 'group01', name : '친구'};

// 위 메소드와 객체를 불러 들이려면
// require() 메소드는 exports 객체를 반환함
var user1 = require('./user1');

function shwUser(){
	return user1.getUser().name + ', ' + user1.group.name;
}

console.log('사용자 정보 : %s', showUser());

// exports에 객체 지정하기
// Reason : exports 는 속성으로, exports에 속성을 추가하면 모듈에서 접근하지만
//			exports에 객체를 지정하면 자바스크립트에서 새로운 변수로 처리함

exports = {
		getUser : function(){
			return {id : 'test01', name : '소녀시대'};
		},
		group : {id : 'group01', name : '친구'}
}

// module.exports를 사용해서 객체를 그대로 할당하기
// module.exports에는 객체를 그대로 할당할 수 있음
var user = {
		getUser : function(){
			return { id : 'test01', name : '소녀시대'};
		},
		group :{ id : 'group01' , name : '친구'}
}
module.exports = user;

//  user4.js
module.exports = function(){
	return {id : 'test01' , name : '소녀시대'};
};

// module.exports에 함수만 할당하기
// require() 메소드는 함수를 반환함
var user = require('./user4');

function showUser(){
	return user().name + ', ' + "No Group";
}

console.log('사용자 정보 : %s', showUser());

// 07-2 사용자 정보 관련 기능을 모듈화
// 스키마 파일을 별도의 모듈 파일로 분리하기
// 스키마는 컬렉션의 구조로 결정하는 것으로 데이터베이스와 분리해서 독립적으로 정의 가능하다.


/// 사용자 처리 함수를 별도의 모듈 파일로 분리해 보기.


