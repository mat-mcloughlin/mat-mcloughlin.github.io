---
layout: post
title: Another Reason you should be doing TDD
date: '2013-06-15 11:00:00'
tags:
- testing
---

![featured-image](/content/images/2014/Apr/bob_martin-1.jpg)

I've been to NDC this week. If you get the opportunity I highly recommend it. 

I spent the first two days of the conference in a workshop with Bob Martin, talking about SOLID principles and TDD. In the TDD talk he opened my eyes up to a different way of looking at it, and I realized something.

All these years I've been doing TDD I've missed an opportunity. I've always written my tests before code (almost always) but the whole time I've been doing it I've had a pre-determined solution in mind. Given a problem, I've worked out how I want to solve it and then started the TDD process. Now this is fine, in fact its a great way to do it.

However, I suggest, next time you come to write some code you apply TDD, but instead of thinking of the solution before hand just concentrate on making the next test pass in the simplest way possible. Try not to think of the bigger picture and don't start create classes you think you might need. I think you'll find you come up with a surprising solution, sometimes.

Now this isn't always the greatest thing to do. And architects out there will be screaming "No plan it all in advance" and they are still right. But it may offer up some simpler solutions and save you a lot of time.

[Here](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata) is the example he used to demonstrate this so take a look. What would have taken 200+ lines of code to solve if I went with my predetermined OO solution was only 16 or so lines of code in one function when solved by purely passing the tests.

I don't care what anyone says about OO principles. 16 lines of code is a damn sight more maintainable.