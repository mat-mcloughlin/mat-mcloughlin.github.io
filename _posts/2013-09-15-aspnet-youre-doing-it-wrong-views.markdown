---
layout: post
title: 'ASP.NET you''re doing it wrong. Part Two: The Views'
date: '2013-09-15 11:00:00'
tags:
- c
- nancyfx
---

![Nancy](/content/images/2014/Apr/nancy.png)

In my previous post I spoke briefly about how to setup routes and handle route arguments etc. In this post I'm going to run through the various options you have for returning and presenting your data in views. If you haven't already I suggest you read the [first part](/2013/08/20/aspnet-youre-doing-it-wrong-an-introduction-to-nancy.html) of this series.

## Returning views and the Convention

Just as a refresher, a simple get method that returns a string, is defined as follows:

```language-csharp
Get["/"] = _ => {
    return "Hello World!"
};
```

To change this to return a view instead is easy. The `NancyModule` base class has a property of type `ViewRenderer` called `View`. This is like the Route handlers in that it is an indexer. It allows you to set the view you wish to return in a number of different ways. As a basic example:

```language-csharp
Get["/"] = _ => {
    return View["Hello.html"]
};
```

This will process and return a view in a file called `Hello.html`.

When Nancy sees that you want to return `Hello.html` it will look in a number of different places for the file. First it will look in the root of your application. If it can't find it there it will look in a directory called `Views` and finally if it can't find it there it will look in folder of the same name as the module that you are returning the view from. That is to say, if your module is called `TurtlesModule` it will look for the folder `Views\Turtles` (Note: the module portion is removed). If it can't find the view in that folder it will throw an error.

The error is one of the things I really like about Nancy. It's actually useful. I know right?! Here's a screen shot:

![Missing View](/content/images/2014/Feb/missing_view.jpg)

If you look on the line that starts "Locations inspected" you can see every place that Nancy has looked for the view. Making it really easy to find the problem.

Now it is possible to change this convention, as it with everything in Nancy, but I will talk about that more when I cover the `Bootstrapper` class in a future post.

## Alternative Methods of Returning a View

The astute among you many have noticed I'm only returning some plain html. What if I want to return a view model as well. Nancy allows you to do this in two different ways. The first is to specify it as the second argument in the indexer:

```language-csharp
Get["/"] = _ => {
    return View["Hello.html", new HelloModel()]
};
```

and the second is a little bit more interesting. You can actually just specify the model:

```language-csharp
Get["/"] = _ => {
    return View[new HelloModel()]
};
```

If you do this Nancy will then attempt to find a view in a file called `Hello.html` (Removing the Model part) in the same fashion as above. I've got to be honest, I'm not a fan of this method. I'd much rather be explicit about the view and the model.

## The Super Simple View Engine and other options

So returning a view is one thing. Chances are you want to do something dynamic with the view model though. Nancy ships with the Super Simple View Engine (I'm going to refer to this as SSVE from now on to save my [keystrokes](http://www.keysleft.com/)). This is, as the name would suggest, simple. If you are wanting to do anything remotely complicated I would recommend using Nancy's implementation of the Razor view engine. But just to show you an example of the syntax:

```language-html
<h1>Hello Turtles!</h1>
<table border="1">
    <tr>
        <th>Name</th>
        <th>Mask Colour</th>
    </tr>
    @Each.Model
    <tr>
        <td><a href="/turtles/details/@Current.Id">@Current.Name</a></td>
        <td>@Current.MaskColour</td>
    </tr>
    @EndEach
</table>
```

It has all the usual iterators and conditionals that you would expect. However, one thing to bear in mind is it cannot handle nested loops. So be aware.

Did I say how extensible Nancy is? :D

If the SSVE isn't good enough for you there are plenty of other options all available by [nuget](http://www.nuget.org/packages?q=nancy.viewengines) packages. And for the most part they are easy to install and configure. As an example see [this](https://github.com/NancyFx/Nancy/wiki/Razor-View-Engine) wiki page. I should point out that this is not the ASP.NET implementation of Razor so you may notice some inconsistencies in what methods are available.

## Bonus Points

- When attempting to locate a view Nancy will look for files with the extension .html or .htm or .sshtml. You don't have to specify the extension when defining the view to return. SSVE will try and parse all of these files.
- In this day and age you probably want to be able to handle different accept headers. [@philiphaydon](https://twitter.com/philliphaydon) has written a great [series](http://www.philliphaydon.com/2013/04/nancyfx-revisiting-content-negotiation-and-apis-part-1/) of posts example on how to do this.


I think thats about it for views. Next post will be about the `Bootstrapper` class which is where Nancy really starts to show its extensibility.