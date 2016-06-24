---
layout: post
title: 'KnockoutJS: "My HTML node has disappeared"'
date: '2014-07-01 15:17:27'
tags:
- knockoutjs
- javascript
---

This is probably the one question I get asked the most about KnockoutJS.

> Why is my 'some random html node' not apearing on my page?

And this is often followed up with a code sample similar to:

{% highlight javascript %}
<!-- ko foreach: myList -->
<th data-bind="text: label">
	<button>*</button>
</th>
<!-- /ko -->
{% endhighlight %}

In this case the `button` node isn't being shown in the rendered html. 

Now the reason for this is that when you use the `data-bind="text: label"` attribute on a node, knockout will then replace the entire contents of that node with the contents of the `label` variable. This will overwrite the button within original node.

The way to get around this problem is to bind the label to a separate `span` node (or whatever is suitable) within the `th` like so:

{% highlight javascript %}
<!-- ko foreach: myList -->
<th>
    <span data-bind="text: label" ></span>
    <button>*</button>
</th>
<!-- /ko -->
{% endhighlight %}

Problem solved.
