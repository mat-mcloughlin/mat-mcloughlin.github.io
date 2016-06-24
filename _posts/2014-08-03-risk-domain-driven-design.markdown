---
layout: post
title: 'Risk: à la Domain Driven Design'
date: '2014-08-03 20:04:40'
---

Ok, attempt two

![Risk](/content/images/2014/Aug/35072DF65056900B100DFE48D0DFCC54-1.jpg)

A few weeks back I decided I was going to use my new found DDD approaches, combined with CQRS and ES, to design the game Risk. And, completely counter to what the practices teach, I went off and started coding a solution with minimal thought or planning. I quickly decided on aggregates and boundaries and off I went, writing my first blog post explaining my proposed solution.

> By the way, I mentioned this as well in my first blog post. I'm not really going to go into much detail on the principles of DDD/ES/CQRS but if you want to learn more these are excellent resources: 

- [Martin Fowler's Blog](http://martinfowler.com/)
- [Greg Young's Blog](http://codebetter.com/gregyoung/)
- [Udi Dahan's Blog](http://www.udidahan.com/?blog=true)
- [Implementing Domain Driven Design](http://www.amazon.co.uk/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577/)
- [Domain Driven Design](http://www.amazon.co.uk/Domain-driven-Design-Tackling-Complexity-Software/dp/0321125215/)

So, why did I just dive in like I did?

Well Risk is a pretty well established game, with its own well defined [ubiquitous language](http://martinfowler.com/bliki/UbiquitousLanguage.html) and the best solution seemed obvious. I just didn't think it required much thought. This was a mistake.

Under the advice of [people](https://twitter.com/deftcode) way more versed in these things than me I decided to take a step back and take a more structured approach at modelling the solution.

> Before I go any further it's probably worth you taking a read of the [rules of Risk](http://www.hasbro.com/common/instruct/risk.pdf), it won't take long and the next section will make more sense. 

Did you read them? I don't believe you, come back when you have.

Ok, now you've read the instructions I will continue.

Instead of closing my eyes and randomly picking some aggregates perhaps it would be better to go right back to the beginning an looked at what I want to achieve:

1. A way for people to create a game and invite people to it
2. A way for people to play a game

Not much really, I want to keep it simple. The next logical step is to come up with ubiquitous language in which to discuss this problem. 

> A ubiquitous language is structured around the domain model and used by all team members to connect all the activities of the team with the software. Giving a common ground for both developers, domain experts and users.

So how do we do this? Generally I would suggest this glossary of terms is best derived from a discussion within the team about specifics of the domain. But where to start? Perhaps we should discuss what decisions are available to a user within the domain and let the language fall out of that.

For example in discussing Risk we can say:

> A __player__ decides to __occupy__ a __territory__ with an __infantry unit__

And straight away we can see there are 4 terms here that can start to form the beginning of our ubiquitous language.

Let's try another decision:

> A player decides to exchange a __Risk card__ for __reinforcements__

There's two more terms we can define, this is good. Let's take things a little further and discuss what data will be available in the context of this decision and what data will need to be provided:

> The available data is what cards the player is currently holding

> The provided data is what cards the player wants to __exchange__

I think we should probably define what is meant by an exchange as well.

But this is still only part of the story of a decision. We can also look at the information that comes out of this decision.

> The knowledge is how many units the player has __drafted__

There's another one.

And finally we can say when this will be decision is available.

> The decision is available when it is the start of the players __turn__ and they have Risk cards available.

So as you can see, when you start looking at the decisions available in domain and the data around them it starts to produce the beginnings of a ubiquitous language. Now you can swap and change these terms afterwards. Maybe call a __player__ a __participant__ but this is a good starting point. 

Here is the glossary of these terms:

- __Player__ - A participant in the game
- __Occupy__ - A player is occupying a territory when he places a unit on a territory that has no unit in it
- __Territory__ - The board is broken into territories representing all parts of the world
- __Infantry Unit__ - This is a single token representing a player's army. It is placed on the board to denote which player occupies which territory (and with how big that army)
- __Risk Card__ - These cards are given to players depending on the outcome of their turns and used to draft new infantry
- __Reinforcements__ - Additional units that become available at the start of a players turn
- __Exchange/Draft__ - The process of trading in Risk cards for reinforcements
- __Turn__ - The time in which the designated player is allowed to make choices

There will be other terms that aren't derived from the decisions but these will probably become apparent in your discussions as well.

I've added a complete set of available decisions [here](https://github.com/mat-mcloughlin/DDD-Risk/blob/master/Available%20Decisions.md) and the full glossary is [here](https://github.com/mat-mcloughlin/DDD-Risk/blob/master/Glossary%20of%20Terms.md). Neither of these things are set in stone, There will surely be times where I need to go back and improve the language or add to them. I've tried to follow the pattern of:

- decides
- available data
- provided data
- knowledge
- decision

Throughout each of the decisions to keep things consistent.

Now that we have a ubiquitous language in which to discuss the domain we can take the next logical step and start looking at our Bounded Contexts and the Entities within them.

If you want to follow along I'm going to host the code on [GitHub](https://github.com/mat-mcloughlin/DDD-Risk).
