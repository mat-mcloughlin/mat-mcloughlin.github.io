---
layout: post
title: '"The fastest way to remove crap from your system… Is to put no crap in your
  system"'
date: '2014-05-26 09:00:01'
tags:
- opinions
---

This is a quote from a talk by [Alberto Brandolini](https://skillsmatter.com/skillscasts/5039-model-storming) that I've just watched. It isn't a new message and I'm certainly not the first person to say it. However I think it’s a point that’s important enough that it’s worth re-iterating every once in a while. 

So often the path of least resistance in software development is just to say yes to every request, yes to every deadline and to treat every bug as an emergency. But these are some of the quickest ways to end up with a monstrosity of a codebase that's unmanageable and a nightmare to work with.

Somebody once said that you should never write down any customer requirements (can't remember who). That way you'll forget the ones that aren't really that important. Whereas the ones that are, will be etched in your mind as the customers will keep on asking. I'm wholly behind this idea. As much as it's important to keep your customers happy you should always be mindful of compromising the integrity of your software by adding in unused or unneeded functionality. Worse still, if you get into a situation where you start implementing individual customer specific requirements. Unless you are very careful you can get yourself really twisted up with complex "turn on for this customer" code that is a nightmare to refactor and manage. 

Tight deadlines are another situation that can get you into rushing code and building up technical debt. How many times have you been in the situation where a deadline has been enforced, you've churned out (bad) code in an effort to get it completed, only to miss the deadline because of bugs. Then you find out the customer isn't in that much of a rush after all. Or even better, you actually manage to make a customer-enforced deadline because they "need" some functionality "urgently". Only to have a bug reported in 6 months time that means they could have never even used that part of the system? Both of these situations are going to leave you with some ugly code that's likely to be in your system for a good while.

It’s the same with fixing bugs. Now I'm not suggesting that you don't make it a priority to fix bugs as soon as possible. However, even what seems as the simplest of bugs can sometimes require some thought to get a clean solution. If you are rushed chances are you'll just hack together a quick solution. Try and avoid doing this. 

I feel that these things are some of the biggest contributors to technical debt and a messy codebase, and the thing is, they are all avoidable. You shouldn't jump to all of your customer requirements and you should question the ones that they consider important. You may find work arounds. You should avoid customer specific code if at all possible. Because this will inadvertently cause problems for other customers, when you have a complex codebase that makes it difficult to fix their bugs. You should always question deadlines, chances are things aren't as urgent as first seemed. And finally if a bug needs more thought for a proper solution you should take the time. It will be better in the long run as you'll have less technical debt to deal with. 

Of course it’s easy to forget all this from time to time...
