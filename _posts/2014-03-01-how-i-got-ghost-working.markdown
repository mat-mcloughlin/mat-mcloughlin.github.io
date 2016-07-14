---
layout: post
title: Moving to Ghost from Jekyll
date: '2014-03-01 12:32:50'
tags:
- c
- tutorial
---

I really like [Jekyll](). Its a nice simple blog engine, but it does have some drawbacks. Because it's a static blog generator you have to compile it on your local machine before uploading it. There is no backend tool so it can sometimes be a pain to sort things like images and previewing. And probably the most annoying is needing to have everything installed on your PC in order to edit a post.

With this in mind I decided I'd try moving to [Ghost](). It's a new blog engine that seems to be gathering a lot of traction. Its got some nice features and although its still in beta I was compelled by its markdown blog editor. And, for the time being I figured I may as well host it on azure as I've been meaning to give that a try for a while.

These are the steps I followed in order to get it deployed and working. It was a bit of effort, but hopefully this will help some people out.

##1. Deploying Ghost to Azure
Luckily Scott Hansleman helped me on this one. Following his [instructions](http://www.hanselman.com/blog/HowToInstallTheNodejsGhostBloggingSoftwareOnAzureWebsites.aspx) was simple. However I did come across one problem that is waiting to be fixed. 

When I ran the git push command it failed with the following error

{% highlight powershell %}
remote: npm http GET https://registry.npmjs.org/busboy/0.0.12
remote: npm ERR! Error: SELF_SIGNED_CERT_IN_CHAIN
{% endhighlight %}

[This](http://blog.npmjs.org/post/78085451721/npms-self-signed-certificate-is-no-more) post explains the fix that is required. It's something that the guys at azure are going to have to sort. But in the mean time you can add this line to you `deploy.cmd` located in `/site/deployments/tools`

{% highlight powershell %}
call :ExecuteCmd !NPM_CMD! config set ca=""
{% endhighlight %} 

before the line

{% highlight powershell %}
call :ExecuteCmd !NPM_CMD! install --production
{% endhighlight %}

I imagine there is a better fix for this coming soon.

##2. Setting up Email
Azure doesn't have email by default but It can be easily setup using Send Grid. You can skip this step if you like but Ghost does use email for password recovery.

Time to go off to another [tutorial](http://jflamb.com/configuring-ghost-to-send-email-on-azure/) for this. Kindly provided by Jim Lamb. 

Couple of additional points on this. Where he says to add your username and password to your app settings, these can be found in the newly created send grid application by clicking "Connection Info" at the bottom of the screen

![connection info](/content/images/2014/Apr/connection_info.png)

##3. Updating ghost details
So now that ghost is up and running you need to remember to setup your details. In my case this was mainly to get the automatically generated RSS feed right:

![ghost settings](/content/images/2014/Apr/ghost_settings.png)

##4. Creating a theme
Creating a theme in Ghost is really easy. The instructions are [here](http://docs.ghost.org/themes/). You may need to restart your website when you deploy your theme.

Although the documentation for creating themes is good it doesn't mention enough about pagination so I'll leave this snippet here as help

{% highlight powershell %}
#123;#123;#if pagination.next#125;
	<a class="prev" href="/page/#123;#123;pagination.next#125;#125;" style="float:left;">Older Posts</a>
#123;#123;/if#125;#125;
#123;#123;#if pagination.prev#125;#125;
	<a class="next" href="/page/#123;#123;pagination.prev#125;#125;" style="float:right;">Newer Posts</a>
#123;#123;/if#125;#125;
{% endhighlight %}

##5. Importing all my posts
I don't have lots of posts but I certainly didn't want to copy paste them all in. There is a ghost exporter/importer available for wordpress but not for Jekyll. Instead, there is this [script](https://github.com/redwallhp/Jekyll-to-Ghost). I had to make some modifications to get it to work with my build but it's a good start.

The import functionality for Ghost is located at

{% highlight powershell %}
<your url>/ghost/debug/
{% endhighlight %}

I had to fix up some bugs in my post afterwards but it wasn't too bad.

##6. Setting URL and the redirects
Instructions for setting up a custom domain for Azure are located [here](http://www.windowsazure.com/en-us/documentation/articles/cloud-services-custom-domain-name/).

Last bit. I wanted to make sure none of my links were broken. Because Jekyll is static all of the post URL's ended in .html. For example 

{% highlight powershell %}
http://mat-mcloughlin.net/2013/08/20/aspnet-youre-doing-it-wrong-an-introduction-to-nancy.html
{% endhighlight %}

By default Ghost has a url's like:

{% highlight powershell %}
http://mat-mcloughlin.net/aspnet-youre-doing-it-wrong-an-introduction-to-nancy
{% endhighlight %}

The first step is to get Ghost to add the date to the URL. This is a checkbox on the ghost settings page:

![ghost permalink](/content/images/2014/Apr/dated_permalinks.png)

That changes the URL to:

{% highlight powershell %}
http://mat-mcloughlin.net/2013/08/20/aspnet-youre-doing-it-wrong-an-introduction-to-nancy
{% endhighlight %}

Then you need to set up some rewrite rules to get any requests to `.html` to redirect to the same url but without the `.html`. This can be achieved by adding this rule to the `web.config` in the root of your website:

{% highlight powershell %}
<rule name="extensionless" stopProcessing="true">
	<match url="(.*)\.html/$" />
    <action type="Redirect" url="#123;ToLower:#123;R:1#125;#125;" redirectType="Permanent" />
</rule>
{% endhighlight %}

Lastly you may need to do the same for you RSS feed:

{% highlight powershell %}
<rule name="rss" stopProcessing="true">
    <match url="rss.xml" />
    <action type="Redirect" url="rss" redirectType="Permanent" />
</rule>
{% endhighlight %}

And that's all I know. It was pretty painless and now I can blog from where I like!
