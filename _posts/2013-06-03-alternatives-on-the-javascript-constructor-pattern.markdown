---
layout: post
title: Alternatives on the Javascript Constructor Pattern
date: '2013-06-03 11:00:00'
tags:
- javascript
- patterns
---

Had a discussion in [@jabbr](https://jabbr.net/) recently about different ways of implementing the constructor/prototype pattern in javascript and a couple popped up. 

##1. Implementing the constructor as a function and all the prototype methods in one go:

```language-javascript
function MyObject(foo, bar) {
  this.foo = foo;
  this.bar = bar;
};

MyObject.prototype = {
  constructor: MyObject,
  someFunction: function() {
    console.log(foo + " and " + bar);
  },
  someOtherFunction: function() {
  }  
};
```

##2. Implementing the constructor as a function and the prototype methods individually:

```language-javascript
function MyObject(foo, bar) {
  this.foo = foo;
  this.bar = bar;
};
	
MyObject.prototype.someFunction = function(){
  console.log(this.foo + " and " + this.bar);
};

MyObject.prototype.someOtherFunction = function(){
};
```

##3. Enclosing all methods within a function and returning the constructor:

```language-javascript
var MyObject = (function(){
  var EXAMPLE_CONSTANT = 4;

  function constructor(foo, bar){
    this.foo = foo;
    this.bar = bar;
  }
	
  constructor.prototype.someFunction = function(){
    console.log(this.foo + " and " + this.bar);	
  };
	
  constructor.prototype.someOtherFunction = function(){
  };
	
  return constructor;
})();
```

I like the final method best it encapsulates all the prototype methods and allows you to have private constants (as shown in the example).

Couple of things to bear in mind when using these methods:

- Always capitalise the first letter of the your function. This tells people that it needs to be called with the new keyword.
- Always use the new keyword. If you forget it then 'this' will be the global object instead of the instantiated object as you were expecting.
- Prototype methods are always public. If you need things to be private your better looking at the revealing module pattern.

If you want to be extra careful and make sure that the new keyword is used you can check this is an instance of the constructor:

```language-javascript
if (!(this instanceof Constructor)){
  console.log('throw some kind of error');
}
```