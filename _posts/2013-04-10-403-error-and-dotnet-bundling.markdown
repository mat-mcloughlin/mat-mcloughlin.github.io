---
layout: post
title: 403 Error and .NET Bundling
date: '2013-04-10 11:00:00'
tags:
- asp-net
- c
---

Came across this one the other day whilst using the .NET bundling functionality. All was fine in debug mode but as soon as I pushed it to production everything went pear shaped. The combined file kept returning a 403 error. 

After a bit of prodding around it turned out the problem was due to me naming my bundle the same as the directory I kept my files in. So this:

{% highlight csharp %}
var bundle = new Bundle("~/Scripts");
bundle.AddFile("~/Scripts/jquery-1.6.2.js");
bundle.AddFile("~/Scripts/jquery-ui-1.8.11.js");
bundle.AddFile("~/Scripts/modernizr-2.0.6-development-only.js");
BundleTable.Bundles.Add(bundle); 
{% endhighlight %}

Won't work. However this:

{% highlight csharp %}
var bundle = new Bundle("~/MyScripts");
bundle.AddFile("~/Scripts/jquery-1.6.2.js");
bundle.AddFile("~/Scripts/jquery-ui-1.8.11.js");
bundle.AddFile("~/Scripts/modernizr-2.0.6-development-only.js");
BundleTable.Bundles.Add(bundle);
{% endhighlight %}

Will. Not the most useful error message but problem solved none the less.
