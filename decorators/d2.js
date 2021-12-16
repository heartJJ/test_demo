"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function testable(target) {
  target.isTestable = true;
}

var MyClass = testable(_class = function MyClass() {
  _classCallCheck(this, MyClass);
}) || _class;

;
console.log(MyClass.isTestable);
