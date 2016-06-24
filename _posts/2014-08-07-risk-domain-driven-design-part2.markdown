---
layout: post
title: 'Risk: à la Domain Driven Design (Part 2)'
date: '2014-08-07 08:26:55'
---

Now that we have defined the [available decisions]() and [ubiquitous language]() we should probably start looking more at how we are going to model our domain.

This has been a tricky to decipher and has been the base of much discussion in Jabbr. I've been trying to stay away from the whole "gut instinct" way of doing things and come up with a solution founded more on practice instead.

Firstly lets attack the bounded contexts within our domain, the definition of which is:

> bounded context definition

With this in mind we can use the ubiquitous lanuage we started to define last time to define our contexts. If we go back and look at it carefully we can see that most of the terminology we use is unambiguous thoughtout the domain. All except one... the player.

Why is this? 

Well, during the course of playing a game of Risk (by the definition of the problem I gave last time). There is the game creation stage where players are invited to and can join the game. Then there is the actual game itself. In the prior we also have the concept of a host which is irrelevant to actually playing the game. The difference in these two definitions of a player may only be small but it warrants a separate BC to avoid confusion. This gives us:

__[Picture of lobby and game bounded contexts]__

This seems pretty sensible to me so I'll stick with it for now.

The next stage is to try and decipher the aggregates lay within these boundaries. Where an aggregate is defined as:

> aggregate defintion

You may find that an aggregate encompases an entire bounded context or there may be multiple within each. If we start with the first BC that we are calling lobby for now and take all the decisions that are involved within it. The first 5 in [this]() list, we can start to look at them and decide which ones are relevant to and depend on each other. For example we can say that:

> The player decides to accept the invitation.

> The host decides to who to invite to the lobby.

Are two decisions that are relevant to each other. Infact we can say that the first 5 decisions are all depenent upon one another because none of them can be made without knowledge of the previous. So I think we can safely say that lobby should also be the only aggregate in that bounded context.

__[Picture of lobby BC with lobby aggregate]__

What about the game bounded context? If you look at the decisions available within this context you could say they are all revelvant and depend on each other. This is how I saw it first. However this leaves you with a lot of decisions to handle within the confines of one aggregate (As you will see later an aggregate should have one entry point responsible for managing the whole state of the aggregate). Let see if we can break it up some more.

After much deliberation it became clear to me. If you look at the decisions that relate to a player making his turn they are all relevant and dependent upon each other. However the game doesn't really care about these decisions. It only cares about the final outcome. This would leave us with a BC's looking like this:

__[image of lobby and game bc]__


next we will go down a step further and define the entities and value objects we will need in each of the aggregates


