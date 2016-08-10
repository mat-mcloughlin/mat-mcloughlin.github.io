---
layout: post
title: Command Handlers
image: 
tags:
- patterns
---

The [command pattern](https://en.wikipedia.org/wiki/Command_pattern) is one of the patterns defined in the gang of four's behavioural patterns but I rarely see it get much use. The idea behind the pattern is to encapsulate all of the information required to execute an action within a single object or class:

{% highlight csharp %}
public interface ICommand
{
    void Execute();
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

Now the reason I want to highlight this pattern is because of something I've been seeing in a lot software projects. That's the abuse of the "service class" in your typical n-tier architecture. These classes often get filled with tens of methods for manipulating some object making them bloated and difficult to understand. They will take a ton of dependencies and are often called `PatientService` or `DoctorService`. Over time these become bloated and unmaintainable.

The best way I find of combating this atrophy is to use the command pattern instead. This allows you to break down you service layers into indvidual classes that are each responsible for only one thing. They only take the dependencies that are needed and are much easier to refactor as there is less chance of the methods depending upon anothers.

However, as much as I feel the command pattern is better I always find there's a couple of problems with it. For one it's awkward to pass in any dependencies as they would have to be included with the information required to execute the command. Theres a couple of obvious ways around this, such as allowing the `firstname` and `surname` to be setable properties but thats a bit mess. What would be better is to actually take things a little further and seperate the execution of the command from the information required to execute it.

This is where the command handler comes in:

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

This is much better as it gives you a clean way to inject some dependencies and it also works much better with message based architectures where you can make use of some basic infrastructure code to marry the command up with the correct handler:

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

This code would allow you to dispatch a message like below: 

{% highlight csharp %}
var dispatcher = new Dispatcher(container);
dispatcher.Dispatch(new AdmitPatient("Fredd", "Bloggs"));
{% endhighlight %}

I am using an IOC container here to resolve the handlers but if you are against this you could also manually register each of your handlers. I find this is better as its more explicit instead of all that IOC magic.

{% highlight csharp %}
var register = new CommandRegister();

register.Register<AdmitPatient>(cmd => 
{
    Console.WriteLine($"FirstName: {cmd.FirstName}");
    Console.WriteLine($"Surname: {cmd.Surname}"); 
});
{% endhighlight %}

{% highlight csharp %}
var dispatcher = new Dispatcher(register);
dispatcher.Send(new AdmitPatient("Fredd", "Bloggs"));
{% endhighlight %}

[Here](https://gist.github.com/mat-mcloughlin/a25c5866800673085738c93e71d6f0da) is the gist for the full sample. This idea was influenced by [@jageall](https://twitter.com/jageall).

You can always take things further and include code to validate your command before it gets executed or add in authorisation to make sure the user is able to execute the command.
