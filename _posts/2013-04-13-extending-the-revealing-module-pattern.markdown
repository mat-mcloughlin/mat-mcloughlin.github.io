---
layout: post
title: Extending the Revealing Module Pattern
date: '2013-04-13 11:00:00'
tags:
- javascript
- patterns
---

Somebody needs to tell me why this is a bad idea as I feel it should be.

Most people working with javascript should be aware of the revealing module pattern, but if you're not here's a quick [example](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript). The idea is to create a javascript object where only the methods and variables you want accessible are public. This is achieved by defining all your functions and variables in a private scope (or function) and then return an object with pointers to the ones you want publicly accessible.

However one thing I've found is it can be tricky to deal with 'this' when things get complicated. For example, in the code below you have to use call to set the value variable.

{% highlight javascript %}
var myConstructor = function(){
	
  var foo = function(){
    bar.call(this);
  };
  
  var bar = function() {;
    this.value = 2; 
  };
  
  return {
    foo: foo,
    value: 1
  };
};

var obj = new myConstructor();
alert(obj.value); // value = 1
obj.foo();
alert(obj.value); // value = 2
{% endhighlight %} 

This becomes even more of a pain when you start with callbacks. So to get round the problem. Is it not better to do this?

{% highlight javascript %}
var myConstructor = function(){
  var self = this;
	
  var foo = function(){
    bar();
  };
  
  var bar = function() {;
    self.value = 2; 
  };
  
  return $.extend(self, {
    foo: foo,
    value: 1
  });
};

var obj = new myConstructor();
alert(obj.value); // value = 1
obj.foo();
alert(obj.value); // value = 2
{% endhighlight %}

That way you'll always have access to the object, no matter how far down your function calls go. I know its a requirement on JQuery but it all seems to work fine.

I'm hoping somebody wiser than me can confirm why this might be a bad idea. Because it feels like it should be.

**Edit:** Credit should go to [@robwesterlund](https://twitter.com/robwesterlund) for this thinking. You'll find him in [Jabbr](http://jabbr.net)
