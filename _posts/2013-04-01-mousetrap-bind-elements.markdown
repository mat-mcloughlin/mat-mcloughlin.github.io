---
layout: post
title: Mousetrap Bind Elements
date: '2013-04-01 11:00:00'
tags:
- javascript
---

Shortcut keys are becoming more and more important in today's web, and libraries like [mousetrap](http://craig.is/killing/mice) are a god send when you want to implement them on your site. It allows you to assign various shortcut keys to callback functions. It even allows key combinations.

To help simplify the implementation I've written an extension that will automatically bind the click event of DOM element to a shortcut key, using a data attribute. For example:

{% highlight html %}
<a href="http://www.stackoverflow.com" data-mousetrap="ctrl+s">Stack Overflow</a>
{% endhighlight %}
 
I've set up a couple of [examples](/examples/mousetrapBindElements.html) to demonstrate it. As an added bonus my library allows you to bind a key to show all the shortcuts available. Simple to do via:

{% highlight javascript %}
Mousetrap.bindPopup('ctrl+;');
{% endhighlight %}

The popups can be styled via the .mousetrap-popup style. I'm going to implement a feedly style popup when I've got time but that's it for now.

[GitHub](https://github.com/mat-mcloughlin/mousetrap.bindElements)
