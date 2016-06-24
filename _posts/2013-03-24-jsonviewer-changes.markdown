---
layout: post
title: Knockout JSON Viewer Update
date: '2013-03-24 12:00:00'
tags:
- knockoutjs
- javascript
---

![featured-image](/content/images/2014/Apr/jsonViewer_subscriber.png)

I've added a couple of additional features to my jsonViewer, Subscriber count and embedded stylesheet.

The green number now shows how many subscribers the observable has, which is good. However, there are a couple of caveats. Firstly, it's important to note, that if a child observable has a subscriber then its parents subscriber count will increment by one. Also if the observable is bound to a DOM object it will increment the subscriber count. **Its not just the number of subscribing functions**.

In addition to this I've embedded the stylesheet in the javascript. As this is debugging tool I wanted to make it as easy as possible to get running. Now you only have to add reference to the js file.

Check it out on [github](https://github.com/mat-mcloughlin/jsonViewer) or the [examples](http://jsfiddle.net/mjmcloug/4F4VX/9/) with subscribers.	