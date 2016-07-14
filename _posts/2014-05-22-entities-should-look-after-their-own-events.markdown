---
layout: post
title: Entities should look after their own events
date: '2014-05-22 09:02:46'
tags:
- ddd
- patterns
- es
- cqrs
---

I've been playing with CQRS and ES a lot recently and to be fair I should have started blogging about my experiences before now. But better late than never. This week I've been looking more carefully at how to manage the events that get applied to an entity within my aggregate root. 

When you first start your journery into CQRS/DDD/ES it won't be long before you come across the term aggregate. To quote Martin Fowler: 

> A DDD aggregate is a cluster of domain objects that can be treated as a single unit. An example may be an order and its line-items.

Each aggregate has a designated aggregate root in which all access to the aggregate must go through. I've found this is usually the top level item in your aggregate (but not always). In the example I describe below where there is site object which has a number of accounts. The site is the aggregate root and everything else in your aggregate (the accounts) is regarded to as an entity. 

Martin also makes mention of this rule about aggregates:

> Any references from outside the aggregate should only go to the aggregate root. The root can thus ensure the integrity of the aggregate as a whole.

At a glance this comment seems to suggest that all your methods for mutating the aggregate should go on the AR (or at least that's how it seemed to me). 

So lets see how that would look. In my example I've got a site with a collection of accounts that can be activated (I'm using [CommonDomain]()):

{% highlight csharp %}
public class Site : AggregateBase
{
	private Guid id;
	private string name;
	private string address;
	private IDictionary<Guid, Account> accounts

    ...
	
    public void ActivateAccount(Guid id)
	{
		this.RaiseEvent(new AccountActivatedEvent(id));
	}

    ...

	private void Apply(AccountActivatedEvent @event)
	{
		this.accounts[@event.Id].Activated = true;
	}
}

public class Account 
{
	private Guid id;
	private string name;
	private string location;

    public Account(Guid id, string name, string location)
	{
		this.id = id;
		this.name = name;
		this.location = location;
	}

	public bool Activated { get; set; }	
}
{% endhighlight %}

Now this is only a very simplistic example so it doesn't look so bad. But imagine if there was some complicated logic around setting an account active. Also imagine if the aggregate root was more realisticly complicated. I also don't like the fact that Activated is a public property on the `Acccount` object. This would soon become too much to handle. 

It would be better if the account entity was responsible for making its self active. 

> This is where I got stuck at had to turn to [jabbr/cqrs](https://jabbr.net/#/rooms/DDD-CQRS-ES) for help.

You see there are a couple of problems with doing this. Firstly you need access to `RaiseEvent` method within the account class. Then you also need an apply method to handle it.

This is the solution we came up with:

{% highlight csharp %}
public class Site : AggregateBase
{
	private Guid id;
	private string name;
	private string address;
	private IDictionary<Guid, Account> accounts

	...

	public void ActivateAccount(Guid id)
	{
		this.accounts[id].Activate();
	}

    ...

	private void Apply(AccountActivatedEvent @event)
	{
		this.accounts[@event.Id].Apply(@event);
	}
}

public class Account 
{
	private Guid id;
	private string name;
	private string location;
	private bool activated;

    private Action<object> raiseEvent;
	
    public Account(Guid id, string name, string location, Action<object> raiseEvent)
	{
		this.id = id;
		this.name = name;
		this.location = location;

        this.raiseEvent = raiseEvent;
	}

	public void Activate()
    {
        if (!this.activated)
        {
            this.raiseEvent(new UserReactivatedEvent(this.Id));
        }
    }

    public void Apply(AccountActivatedEvent @event)
    {
        this.activated = true;
    }
}
{% endhighlight %}

If you look at the constructor of the `Account` class it now accepts an action so that you can pass the `RaiseEvent()` method in. It is now also responsible for applying its own events (albeit via a proxy apply method on the AR). 

I much prefer this method as it makes each entity responsible for its self and keeps the AR clean.





