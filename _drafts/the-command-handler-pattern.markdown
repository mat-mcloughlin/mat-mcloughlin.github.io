---
layout: post
title: The Command Handler Pattern
---

Last week I spoke at NDC about "Escaping the Big Ball of Mud" and as part of the talk I briefly discussed the command pattern or command handler pattern. A lot of people seemed interested so I thought I'd detail how it was implemented in the demonstration. 

Firstly, the idea behind the command pattern is to encapsulate all the information required to perform and action. Often these commands are implemented using an `ICommand` interface that looks like this:

```
public interface ICommand
{
    void Execute();
}
```

where the implementation may look something like this:

``` 
public class CreateDealTicket : ICommand
{
    private readonly IRepository _repo;

    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Amount { get; set; }

    public CreateDealTicket(IRepository repo)
    {
        _repo = repo;
    }

    public void Execute()
    {
        var dealTicket = new DealTicket(Id, Name, Price, Amount);
        _repo.Save(dealTicket);
    }

}
```

Where it can be called as below:

``` public class FooController : ApiController


Encapsulating your commands like this is great as it gives you a great facade over your domain model and abides by SRP instead of trying to encapsulate all your actions within a "service" class.

But the way in which you interact with these commands isn't very nice and can be improved on. 
