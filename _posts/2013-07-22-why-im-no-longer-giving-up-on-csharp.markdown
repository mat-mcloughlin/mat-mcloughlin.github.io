---
layout: post
title: Why I'm no longer giving up on C#
date: '2013-07-22 11:00:00'
tags:
- c
---

For while now I've been getting bored and annoyed with C#. Its not that its a bad language, its just that when you look around the web there seems so many other languages that seem so fluent to write. NodeJs, Ruby, Javascript, Cloujure. These languages are all the rage at the moment and with good reason. Recently I've been playing around with all these languages trying to find a replacement for the C# that I've grown to hate.

However, I realised something (and to be fair its pretty obvious). Its not C# the language that I've found frustrating but the frameworks and libraries I've been using. As like most C# developers I've been using the usual MS web stack of either MVC or WebAPI coupled with EF. Usually sticking together some sort of repository pattern. This has caused me so many headaches. From WebAPI throwing away half the request object after model binding to EF trashing some simple query or the occasional N+1 sneaking in there. Its enough to drive someone crazy.

I'm here to tell you there is another way, The non microsoft way (Sorry MS) there are so many alternative libraries and frameworks out there, that are often over looked, that will help re-ignite your love for C#. I thought I'd mention a few.

##[Nancy](http://nancyfx.org/)
This is the one that changed it for me. Its a light weight web framework that is a great alternative to WebAPI an MVC.NET. [@grumpydev](https://twitter.com/Grumpydev) and [@thecodejunkie](https://twitter.com/TheCodeJunkie) who wrote it have the Super Duper Happy Path ethos and it really works. Everything in it is simple to set up. From forms authentication through to dependancy injection. And as strange as it may sound, the syntax is a pleasure to write for example:

{% highlight csharp %}
public class SampleModule : Nancy.NancyModule
{
    public SampleModule()
    {
        Get["/"] = _ => "Hello World!";
    }
}
{% endhighlight %}

To setup a simple get request. Also, the [documentation](https://github.com/NancyFx/Nancy/wiki) is excellent.

##[Massive](https://github.com/robconery/massive)
This is a DataAccess tool written by [@robconery](https://twitter.com/robconery). Its simple, easy to setup and easy to use. However it does rely heavily on dynamic, so if your not into that kind of thing then you might want to give this one a miss.

##[SimpleAuthentication](https://github.com/SimpleAuthentication/SimpleAuthentication)
[@purekrome](https://twitter.com/purekrome) wrote this library and I honestly can't believe that anybody who wants to support multiple OAuth logins on their site would use anything else. With only a couple of lines you can allow login via Facebook, GitHub, Google. Twitter was enabled but is broken since they updated their api, I'm sure this will be sorted soon.

##[RavenDB](http://ravendb.net/) (Note: not always free :( )
This document store written by [@ayende](https://twitter.com/ayende) is very nice. For those who have yet to pay any attention to the NoSQL revolution here is a good place to start. It has a great user interface and is incredibly easy to get started with. Rob Conery has some great [tutorials](http://tekpub.com/collections/everything/products/raven) on it. Additionaly if your not sure about just storing your data in RavenDB they allow you to setup replication back to a SQL Server.

So as you can see there are some great alternatives out there if just spend the time to look around.
 
