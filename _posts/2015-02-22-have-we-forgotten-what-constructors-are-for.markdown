---
layout: post
title: Have we forgotten what constructors are for?
date: '2015-02-22 16:35:32'
featured: true
---

Bit of a sensational title there, but I do think it's true. Believe it or not constructors are not just for injecting dependencies into a `Controller` or a `Service`. They actually serve another purpose as well. Making sure that we can't construct an object in an invalid state.

I often see code like this in a project:

{% highlight csharp %}
public class Vehicle
{
    public string Registration { get; set; }
    public string Colour { get; set; }
}
{% endhighlight %}

I'll probably find Entity framework in the same project as well, which is actually one of the libraries I blame for this epidemic :). 

Can you have a vehicle without a registration or a colour? Maybe, but if you can't should you allow a `Vehicle` to be instantiated without them? Would it not be better to enforce this business rule?

{% highlight csharp %}
public class Vehicle
{
	public Vehicle(string registration, string colour)
    {
    	Registration = registration;
        Colour = colour;
    }
    
    public string Registration { get; set; }
    public string Colour { get; set; }
}
{% endhighlight %}

Hell, we could even go one step further and make sure both the registration and colour are valid.

{% highlight csharp %}
public class Vehicle
{
	public Vehicle(string registration, string colour)
	{
	    CheckRegistrationIsValid(registration);
    	    CheckColourIsValid(colour);
    
    	    Registration = registration;
    	    Colour = colour;
	}

    public string Registration { get; set; }
    public string Colour { get; set; }
}
{% endhighlight %}

How nice is this? 

Now you can no longer create a vehicle without a valid colour or registration. That method you were going to write in your `Service` to make sure your vehicle is valid can be forgotten about too. Besides it wasn't going to be that effective anyway as it was only going to make sure your vehicle was valid at a single point in time. You could have always changed it afterwards.

{% highlight csharp %}
public void Insert(Vehicle vehicle)
{
    if !CheckVehicleIsValid(vehicle) 
    {
    	return;
    }
    	
    vehicle = new Vehicle(); // oops!
    
    _repository.Insert(vehicle);
}
{% endhighlight %}

We really want to go one step further and stop the properties on our vehicle being changed without our rules being enforced but I think this is a good start.

This isn't a new idea. Infact its a pretty core concept in object orientated design. So why have we stopped doing this? As I mentioned before I partially blame EF. Or more importantly I blame the collection of tutorials that came with it. All demonstrating entities as POCO's with no validity enforced on them what-so-ever. So what did we do? We started copying them. Myself included. 

Perhaps its time to stop?

Ps. I'm curious, is it just me who sees and thinks this?

__EDIT__ : Here's some discussion about the post on [reddit](http://www.reddit.com/r/programming/comments/2wvbsj/have_we_forgotten_what_constructors_are_for/)
