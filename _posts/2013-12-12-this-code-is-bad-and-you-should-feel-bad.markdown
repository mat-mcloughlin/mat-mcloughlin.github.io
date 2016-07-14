---
layout: post
title: This Code is Bad and you should feel Bad
date: '2013-12-12 12:00:00'
tags:
- c
- fix
---

![featured-image](/content/images/2014/Apr/disapproval.png)

Want to mark some code as bad in your code base? Somebody written some poor code and you want to point it out? Need to mark some code to be reviewed? Well this is the attribute for you!

{% highlight csharp %}
[AttributeUsage(System.AttributeTargets.All, AllowMultiple = true, Inherited = true)]
public class ಠ_ಠAttribute : Attribute
{
    public ILog Log { get; set; }
 
    public ಠ_ಠAttribute()
    {
        Log.Info("This code is bad and you should feel bad");
    }
}
  
[ಠ_ಠ]
public class SomeClass
{
 
}
{% endhighlight %}
This code was supplied to me by a [JabbR](https://jabbr.net/) friend called Ben Hyrmn (and I'd link him on twitter if he hadn't absconded!)
