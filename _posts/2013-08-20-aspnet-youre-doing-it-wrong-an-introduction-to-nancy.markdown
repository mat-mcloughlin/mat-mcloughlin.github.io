---
layout: post
title: ASP.NET You're doing it Wrong. An Introduction to Nancy
date: '2013-08-20 11:00:00'
tags:
- c
- nancyfx
---

![featured-image](/content/images/2014/Apr/nancy-1.png)

_Now I'm sure there are posts like this already available and I know the Nancy wiki is pretty damn good too. However, I'm giving a talk at [Leeds Sharp](http://www.leeds-sharp.org/events/2013/8) (my first) in a few weeks and this is as much preparation for this as anything else._

How many of you use ASP.NET MVC? You're doing it wrong. 

No I'm just joking. While ASP.NET is perfectly acceptable I'm here to show you an alternative, NancyFX. So, as it says on its blog its

> "A lightweight, low-ceremony, framework for building HTTP based services on .Net and Mono"

Which basically means it can be used as a viable replacement for WebAPI or MVC. It's based upon Sinatra for Ruby, if any of you have heard of that, and I think it offers a really elegant way to write your web site or app. In this first part I'm going to show how easy it is to setup a Nancy application and create some basic `GET` and `POST` methods. So let's jump straight in and create the application.

Firstly you need open up Visual Studio and create a new empty website in visual studio: 

![Selecting Project Type](/content/images/2014/Feb/selecting_project_type.png)

![Selecting Project Type Two](/content/images/2014/Feb/selecting_project_type_2.png)

Then go ahead and delete any pre-generated content. You should end up with a project looking like this:

![Final Layout](/content/images/2014/Feb/final_layout.png)

Finally open up the package manager console and install the Nancy hosting nuget package

{% highlight csharp %}
PM> Install-Package Nancy.Hosting.Aspnet
{% endhighlight %}

Nancy also allows you to host on other [environments](http://www.nuget.org/packages?q=nancy.hosting) such as OWIN and as such actually has no dependencies on ASP.NET. But for this example will stick to ASP hosting.

Now that Nancy is installed we can create our first module. The Nancy website defines a module as "the way of defining the behaviours of your application", which they are. But for the sake of this article and the fact that most of you are probably coming from ASP.NET MVC it's comparable to a controller. They are easy to create and don't force any folder structure or naming convention on you. They just have to inherit from the `NancyModule` class. This means you're free to organise the project as you see fit. So lets create our first one:

{% highlight csharp %}
// Note: There is no requirement to suffix your class name with Module, I just like it.
public class TurtleModule : NancyModule
{
    public TurtleModule() { }
}
{% endhighlight %}
    
The next thing we need are routes and this is where it gets a little trickier to explain. The `NancyModule` class has a series of property indexers for each of the http verbs that is of type `Func<dyanmic, dynamic>`. Where the `dynamic` that gets passed in contains any route arguments (I'll show that later). If indexers are new to you (and they were to me) then take a look at the [msdn article](http://msdn.microsoft.com/en-us/library/aa288465.aspx), it's got a pretty good explanation. 

To create a `GET` route you need to define it in the constructor:

{% highlight csharp %}
// Note: arguments can be named anything.
Get["/turtle"] = arguments => 
{
    return "Teenage Mutant Ninja Turtles";
};
{% endhighlight %}
    
Mind, blown right? I really like the way that Nancy writes. I think it's very clean and elegant. I like the way each route is defined explicitly, in the module, as oppose to the crazy "Which route is it picking?" method of ASP.NET MVC.

As for specifying route arguments that's pretty simple too. There are a number of options from simple pattern matching right through to more complex regular expressions. These are all explained on the [website](https://github.com/NancyFx/Nancy/wiki/Defining-routes#pattern) but for my example I'm just going to use a simple pattern match:

{% highlight csharp %}
Get["/turtle/{name}"] = arguments => 
{
    // Note: the arguments are case insensitve. arguments.name is also fine.
    return "Hello" + arguments.Name;
};
{% endhighlight %}

Defining a `POST` or `PUT` request is exactly the same. The post form is available in the Request property on the NancyModule or you can get it the easy way buy accessing it via model binding (It really is this simple):

{% highlight csharp %}
Post["/turtle"] = arguments => 
{
    var model = this.Bind<Turtle>();
    return model.MaskColour;
};
{% endhighlight %}
    
And finally, as an added bonus, instead of defining your routes route on each of the verb methods you can set it by passing it into the base constructor:

{% highlight csharp %}
public class TurtleModule : NancyModule
{
    public TurtleModule() : base("/turtle")
    {
        Get["/"] = arguments => 
        {   
            return "Teenage Mutant Ninja Turtles";
        };
    }
}
{% endhighlight %}
    
That is really all there is to it. There's plenty more you can do within a module, such as extending it with validation or authentication but I'll cover that in later posts. 

I've created a [gist](https://gist.github.com/mat-mcloughlin/6282141) of this code. Next time I'm going to take a look at returning and populating views.

__NOTE: As I've been reliably informed several time :). You can also use the Nancy [project templates](http://visualstudiogallery.msdn.microsoft.com/f1e29f61-4dff-4b1e-a14b-6bd0d307611a).__
