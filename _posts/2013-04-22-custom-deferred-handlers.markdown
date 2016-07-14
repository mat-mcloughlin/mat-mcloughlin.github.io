---
layout: post
title: Custom JQuery Deferred Handlers
date: '2013-04-22 11:00:00'
tags:
- javascript
- jquery
---

As the codebase at work gets bigger and bigger I've been trying to think of ways to simplify some of the simple create and update javascript functionality. Our application works by having a context that you can define a resource for then use to perform the CRUD functionality. For example:

{% highlight javascript %}
var fooContext = context.define('foo');

var createButton = function() {
  fooContext.create(foo).then(function(response) {
    // Something has been created. Navigate off
  })
};

var updateButton = function() {
  fooContext.update(foo).then(function(response) {
    // Something has been updated. Update message
  })
};
{% endhighlight %}

Now there are a lot of objects in our application so this code appears a lot. So I figured I could combine in it in a similar way to a common pattern on the server side:

{% highlight javascript %}
if (foo.id > 0) {
  // update
} else {
  // create
}
{% endhighlight %}

But I also wanted to handle the response differently as well. Now as the astute of you have may noticed I'm using the JQuery $.Deferred functionality. So I thought I'd create two custom deferred handlers. One for created and one for updated, and this is how I did it:

{% highlight javascript %}
var save = function(item) {
  var isUpdate = false;
  var deferred;

  if (item.id && item.id > 0) {
    isUpdate = true;
    deferred = update(item);
  } else {
    deferred = create(item);
  }

  // Additional handlers
  deferred.created = function(callback) {
    if (!isUpdate) {
      deferred.then(callback);
    }
    deferred;
  };

  deferred.updated = function(callback) {
    if (isUpdate) {
      deferred.then(callback);
    }
    return deferred;
  }; 

  return deferred;
};
{% endhighlight %}

In the example the update and create functions are both deferred as well. This now allows me to write the above code as:

{% highlight javascript %}
var fooContext = context.define('foo');

var saveButton = function() {
  fooContext.save(foo).created(function(response) {
    // Something has been created. Navigate off
  }).updated(function(response) {
    // Something has been updated. Update message
  });
};
{% endhighlight %}
