---
layout: post
title: When you Shouldn't Bother Testing
date: '2013-05-16 11:00:00'
tags:
- testing
---

![featured-image](/content/images/2014/Apr/why_you_no_test.jpg)

TDD is the way to go, I'm absolutely sure of it. It brings more benefits than you might first think. As well as the simple fact that your code will be more reliable, it forces you to write your code in a way that is testable, which in turn will make it loosely coupled and modular. It forces you to think about what you want your code to do before you start writing it. It brings other additional benefits that I won't bother to mention, suffice to say theres no excuse for not using it in modern development.

However, there a couple of reasons when you shouldn't even bother with unit tests:

##If you don't know the language well
Don't even bother with unit tests at this point. Your code will change so much as you learn, its best just to leave the tests all together until you get a better grasp on the language.

##You don't know the domain well
Again its a similar thing, chances are you won't have a good enough idea of how your solution will work. Again, as above, your code will change so much that its going to waste too much time testing.

##You don't know the framework you are using
The first few weeks/months of using a new framework you'll do most things wrong and then end up having to re-write lots of code. Your unit tests will get broken all the time and probably all need to be re-written as your learn how to layout your code better.

In short unit tests will be more hinderance than help if there is a lot of prototyping and learning in your application. In cases like this your best doing away with the tests and just writing the code. Wait until your code starts to stabilise and then go back and review the situation then. 

As much as unit tests give you flexibility by allowing you to change code quickly with more assurance that you won't break anything inadvertently. It can also really slow down prototyping and rapid development if you don't have an understanding of your environment.

The reason I mention this is so many tutorials and advice on the internet tell you to not write a line of code until you've written a test. I think you need to be a little more pragmatic about it.

On another note. If you wanna learn how to TDD the proper way watch [this](http://tekpub.com/productions/ft_tdd_wilson) from [@bradwilson](https://twitter.com/bradwilson) an [@robconery](https://twitter.com/robconery)