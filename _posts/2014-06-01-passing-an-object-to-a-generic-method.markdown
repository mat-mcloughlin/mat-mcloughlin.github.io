---
layout: post
title: Passing an object to a generic method
date: '2014-06-01 08:15:11'
tags:
- c
---

There's nothing complicated about this. But for some reason the solution escaped me. You know how it is. You have an idea in your mind and it just gets more and more complicated. Then somebody comes along and shows you something really simple. So you may know how to do this. You might not. But I found it interesting enough to blog about. 

Imagine you want to invoke a method defined as below: 

```language-csharp
public void Execute<T> Generic(T foo) where T : class 
{
	var bar = new SomethingElse<T>(foo);
    
    ....
}
```

Except you don't know the object type at compile time:

```language-csharp
object somethingToPassIn = GetSomething();
```

Perhaps you've done some serialisation from a http request. This means that `T` will be `object` instead of an explicit type. 

So how do you get around this? 

Well, you use reflection. The basic principle is to create an additional, non-generic method, that accepts an object and then use reflection to call the generic method. Like this:

```language-csharp
public FooClass()
{
    this.genericMethod = typeof(FooClass)
        .GetMethod("Generic", BindingFlags.Instance | BindingFlags.NonPublic);
}

public void NonGeneric(object foo)
{
        this.genericMethod
            .MakeGenericMethod(command.GetType())
            .Invoke(this, new[] {foo});
}
```

You notice that we get hold of the `MethodInfo` as part of the constructor so that we don't need to do it every time the non-generic method is called. 

And that's all there is to it. It's really simple and you would not believe the convoluted solutions I came up originally. 