---
layout: post
title: JavaScript can double your codebase so make sure you need it first
date: '2013-08-12 11:00:00'
---

There's been a JavaScript/SPA revolution in the past couple of years. Its now back in fashion and a lot of people are using it. I'm here to tell you it might not be worth it and that you should stick to server side code. 

I use JavaScript everyday. Our main application is a SPA (kind of) and it works well. However, it did take a long time to write and our codebase is a lot bigger and more complicated because of it. It's made me realise that you should think very carefully before jumping on the bandwagon. However, there are some positives to a heavy JavaScript client:

- It gives your website a native feel. This can really help improve the user experience, although a native app would really be better.
- It can be faster because, after the initial page load, you don't need to send as much data from the server.
- It’s a good way to dog food your API if it is for public consumption (this was a big one for us).
- It can help you to manage disconnections. Having the majority of your code on the client can be great if the user is in area of poor connectivity. This can be difficult to manage.

Those advantages are great but do you need them? Because they bring a lot of headaches:

- Because the client side is completely separate from the server it means you have a lot of code duplication. In particular you'll have to duplicate the majority of your models and validation. Then there's the code to convert these models in a fashion that is suitable for sending to the server etc. 
- It puts a lot more of the processing on the clients and as much as we'd like to pretend everybody has powerful devices it's not always true.
- You have to take into consideration all the different browsers more than you would if you kept your code on the client. IE6 may be dead but there are still a lot of inconsistencies between most modern browsers.
- You have to expose your API. This means you'll probably have to manage authorization on the client as well as the server.
- Chances are your team isn’t as well versed in JavaScript as they are in their chosen server side language meaning there will be a learning curve.
- You have to write a lot more code for managing client side navigation.
- You'll have a much larger dependency on third party libraries as the JavaScript community is heavily built on these. 

It just seems like you're increasing the size of your codebase (and tests) whilst at the same time reducing maintainability and increasing the probability of problems in your code. All for very few, possibly unnecessary, gains. I'm not saying there isn't a place for JS in our world. I'm saying think carefully. Chances are a traditional MVC app is more than adequate for your needs and it will speed up development times if you don't have to worry about it. Allowing you to get your product to market quicker and think more about functionality instead.
