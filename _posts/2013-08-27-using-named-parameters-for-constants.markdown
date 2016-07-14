---
layout: post
title: Using Named Parameters for Constants
date: '2013-08-27 11:00:00'
---

Short post this one. I might not being telling you anything new here, but a friend pointed out a good use for named parameters other than the usual optional parameters.

Consider these two examples:

{% highlight csharp %}
var foo = Bar(123);
var person = Person("Fred Bloggs", true);
{% endhighlight %}

Any idea what the parameters mean? Me neither.

However if you explicitly name the properties:

{% highlight csharp %}
var foo = Bar(seconds: 123);
var person = Person("Fred Bloggs", isMale: true);
{% endhighlight %}

It becomes clear.

I think this really improves the readability of the code. I didn't specify the name of the property in the second example as its pretty clear what the value being passed in is. So I'd only use this where it's necessary. 

###Update
A friend has pointed out that the use of named parameters might also be useful in this case as well:

{% highlight csharp %}
var person = new Person("Shawn", "Edwards");
{% endhighlight %}

When somebody comes to updating this code its a real possibility that they accidently swap the two parameters around. Name them and you're reducing that risk:

{% highlight csharp %}
var person = new Person(foreName: "Shawn", surname: "Edwards");
{% endhighlight %}

I'm also aware that you could make a constant out of the value but I like this method.

