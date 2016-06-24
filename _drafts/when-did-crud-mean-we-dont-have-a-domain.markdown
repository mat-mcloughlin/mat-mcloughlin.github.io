---
layout: post
title: When did we decided CRUD means we don't need a domain model?
---

CRUD stands for create, read, update and delete. These are the four main operations of an persistance mechanism. It's a good idea to reflect these verbs into your codebase as well especially when using ORM's and the like as it gives you a common lanugage between the DB and the code. For example you know that

```
OrderRepository.Create(order, todaysDate);
```

Is going to create a new order in the database. Just as much you know that 

```
OrderRepository.Update(orderId, order, todaysDate);
```

Is probably going to update an order. This is a good thing.

But when did we decide that our CRUD code should also be responsible for handling our business logic as well? I've seen a lot of code over the past couple of years where you'll see some business logic sneaked into the update or create method. Something along the lines of 

```
public void Update(int orderId, Order order, DateTime todaysDate)
{
	if (order.Status == "submitted") 
    {
    	// execute some custom code to update the order in a particular way
    } else 
    {
    	// Do the normal thing when saving a draft order
    }
}
```

This is just simple example but I've seen these things get way out of control. Resulting in update method (or more) containing some incredibly complicated logic. Which is utimately unmaintainable and unreliable as you can never really be sure as to whats going on.

### Enter the domain model
I remember a time when I was at uni studing oop that we used proper oop princinples that meant if we wanted to modify an order we would call a method on the order class

```
order.Submit(todaysDate);
```

and the code within that method would be soley responsible for submitted the order. No more, no less. If we wanted to mark it as a draft order we'd have another method called

```
order.MarkAsDraft();
```

```
var order = orderRepository.Get(orderId);
order.Submit();
orderRepository.Update(order);
```

Why did we stop doing this? I speculate that it might be due to ORM's and skinny little POCO entities that are no more than a DTO object. Because of the simple examples on the internet people got scared of adding business logic to their business models