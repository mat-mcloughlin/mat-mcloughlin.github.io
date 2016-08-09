---
layout: post
title: Command Handlers
image: 
tags:
- patterns
---

The [command pattern](https://en.wikipedia.org/wiki/Command_pattern) is defined in the gang of four's behavioural patterns but I rarely see it get much use. The idea behind the pattern is to encapsulate all of the information required to execute an action within a single object or class:  

{% highlight csharp %}
public interface ICommand
{
    void Execute()
}

public class AdmitPatient : ICommand
{
    string firstname;

    string surname;

    public AdmitPatient(string firstname, string surname)
    {
        this.firstname = firstname;
        this.surname = surname;
    }

    public void Execute()
    {
        // do something here
    }
}
{% endhighlight %}

Now the reason I want to highlight this pattern is because of something I've been seeing in a lot software projects. That's the abuse of the "service class" in your typical n-tier architecture. These classes often get overloaded with multiple methods for manipulating some object. Often called `PatientService` or `DoctorService` 
More often than not I see people use the typical n-tier "service layer" instead of this pattern. But they are a bit rubbish as you often end up with these monolythic class called `PatientService` or `DoctorService`, 1000 of lines long and completely incomprahensable. You know exactly what I'm talking about.

However as much as I feel the command pattern is better I always feel there's a couple of problems with this pattern. For one it's awkward to pass in any dependencies as they would have to be included with the information required to execute the command. Theres a couple of obvious was around this, such as allowing the `firstname` and `surname` to be setable properties but thats a bit mess. What would be better is to actually make use of the command handler pattern

The command handler takes things a step further and seperates the information required to execute the command from the code required to execute. So instead you end up with code like this:

{% highlight csharp %}
public interface ICommandHandler<T>
{
    void Execute(T command);
}

public class AdmitPatient
{
    public string FirstName { get; }
    
    public string Surname { get; }

    public AdmitPatient(string firstname, string surname)
    {
        FirstName = firstname;
        Surname = surname;
    }
}

public class AdmitPatientHandler : ICommandHandler<AdmitPatient>
{
    IRepository repo;

    public AdmitPatientHandler(IRepository repo)
    {
        this.repo = repo
    }

    public void Execute(AdmitPatient command)
    {
        // do something here
    }
}
{% endhighlight %}

This is much better as it gives you a clean way to inject some dependencies and it also works much better with message based architectures where you can just handle the message information in isolation. Serialising and de-serialising as appropriate. 

It's also great used in conjunction with a small dispatcher to allow you to automatically marry the command half up with the correct handler

{% highlight csharp %}
public Dispatcher
{

    IContainer container;

    public Dispatcher(IContainer container)
    {
        this.container = container;
    }

    public void Send(object message)
    {
        SendGeneric((dynamic)message);
    }

    public void SendGeneric<T>(T message)
    {
        var handler = container.Resolve<IHandler<T>>();
        handler.Execute(message);
    }
}
{% endhighlight %}

Allowing you to simply dispatch a message: 

{% highlight csharp %}
var dispatcher = new Dispatcher(container);
dispatcher.Dispatch(new AdmitPatient("Fredd", "Bloggs"));
{% endhighlight %}

I'm using an IOC container here to resolve the handlers but if you are against this (I know I am) you could also manually register each of your handlers. I find this is better as its more explicit instead of all that IOC magic.

{% highlight csharp %}
var register = new CommandRegister();

register.Register<AdmitPatient>(cmd => 
{
    Console.WriteLine($"FirstName: {cmd.FirstName}");
    Console.WriteLine($"Surname: {cmd.Surname}"); 
});

var dispatcher = new Dispatcher(register);
dispatcher.Send(new AdmitPatient("Fredd", "Bloggs"));
{% endhighlight %}

