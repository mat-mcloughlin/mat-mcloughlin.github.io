---
layout: post
title: 'Risk: à la Domain Driven Design'
---

I've been playing with DDD principles for a while now and they are starting to make a lot of sense. Combined with CQRS and Event sourcing they make for a very powerful architecture when building complex applications. 

I won't go into the fundamentals of these principles here but if you do want to learn something about them I can recommend these resources and books:

- [Martin Fowler's Blog](http://martinfowler.com/)
- [Greg Young's Blog](http://codebetter.com/gregyoung/)
- [Udi Dahan's Blog](http://www.udidahan.com/?blog=true)
- [Implementing Domain Driven Design](http://www.amazon.co.uk/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577/)
- [Domain Driven Design](http://www.amazon.co.uk/Domain-driven-Design-Tackling-Complexity-Software/dp/0321125215/)

To try and demonstrate these principles and further my learning I wanted to create a sample application. Now there are already too many shopping cart applications out there so I thought it would be fun to try something a little different. So with that in mind I'm going to try modelling and building the game [Risk](http://en.wikipedia.org/wiki/Risk_(game). I'm also going to try and pull on the community as much as possible to find and discuss the mainly possible ways of implementing this. Then I'll try and document my findings here on my blog.

> Now, to be honest, I didn't think this was going to be too difficult a domain to deal with. But already there are already lots of question to be answered.

After re-reading the [rules](http://www.hasbro.com/common/instruct/risk.pdf) of Risk (I've played before but it's been a while) I decided to set some constraints on the project:

- Firstly I would only handle the traditional map. There are many different variations on Risk based around Middle Earth or some other far off place.
- I would stick to the original rule set. Over time Risk has seen the emergence of new rules for playing the game.

So with this in mind I went to speak to my friend [Bryan](https://twitter.com/deftcode) about the project. We had a quick discussion about the domain and to see if there was any natural boundaries (see [bounded context](http://martinfowler.com/bliki/BoundedContext.html)) that appeared in the model. Your initial thought might be that there is only one BC, the game, it was mine too. But after some thought it seemed that there was actually three. Lobby, game setup and game:

![](/content/images/2014/Jul/lobby-1.png)

![](/content/images/2014/Jul/game-setup-1.PNG)

![](/content/images/2014/Jul/game-1.PNG)

So how did I come to this conclusion? Well if you think about the three BC's there isn't really any related concepts between them.

> Hang on a minute, each of these BC's have players, aren't they the same thing?

Well I've thought about this long and hard and although they might all have __players__, in the strictest sense, their job in each of these contexts is completely different.

- In the __lobby__ the responsibility of the __players__ is to join or leave the __lobby__. This functionality will never cross into either of the other contexts.
- In the __game setup__, the __players__ will place their starting units on the board. A task that again will never cross into any of the other contexts.
- And finally the __players__ in the __game__ will be used to move units around the map. Again, this ability is completely independent from any of the other contexts.

Seemed sensible to me. However, after I started to code this up the point came under lengthy debate again. The other opposing opinion was that Game is actually the only bounded context and the entities mentioned above should only be able to perform certain functionality when the game is in a certain state. 

I can see the logic in this way of thinking but how do you decide between the two options? Well that's very tricky and you could discuss and argue the point long into the night. However, from my understanding of a bounded context and the [defintions](http://msdn.microsoft.com/en-us/library/jj591572.aspx) I've read:

> Bounded contexts are autonomous components, with their own domain models and their own ubiquitous language. They should not have any dependencies on each other at run time and should be capable of running in isolation. However they are a part of the same overall system and do need to exchange data with one another.

The BC's I've decided on seem like a logical place to split the domain. Now I may be wrong on this, but I can always go back and refactor.

The next thing to look at is the [Ubiquitous language](http://martinfowler.com/bliki/UbiquitousLanguage.html). I should have probably covered this before now but because the game of Risk is so well established I thought it safe.

If you want to follow this project along I'm committing all my code to a [Git repository](https://github.com/mat-mcloughlin/DDD-Risk).

Finally. I'm still very much an [FNG](http://en.wikipedia.org/wiki/Fucking_New_Guy) when it comes to DDD so any criticism is more than welcome!