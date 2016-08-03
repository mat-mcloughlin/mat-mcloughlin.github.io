---
layout: post
title: Keeping a clean git history
date: '2015-06-27 09:40:20'
featured: true
---

Is it just me?

I can’t stand a messy git history. Full of unnecessary merges and commits. With messages such as:

- “Oops…”

- “Forgot to add a file”

- “Fixed a bug”

Making it difficult to look back and find why and when certain changes were made.

And what’s with all the merge bubbles clouding up the stream offering no value or information. This guy gets it:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">The case for rebase. <a href="http://t.co/hShp1QLqMi">pic.twitter.com/hShp1QLqMi</a></p>&mdash; Johnno Nolan (@JohnnoNolan) <a href="https://twitter.com/JohnnoNolan/status/601663856658751489">May 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Day to day these things don’t really matter. But when the time comes to go back and use your git history to determine why somebody made a change that looked crazy, then these valueless commits become incredibly frustrating.

So what can you do about it? Here are 3 simple things I do on a day to day basis to try and keep a clean history.

## Squash your commits in to logical chunks
It’s ok to commit as you go when writing some new functionality. Infact its important. But it doesn’t mean you need to push all those commits individually. Take a look at the following commits for example:

{% highlight powershell %}
Author: super-villan <super.villan@gmail.com>
Date:   Fri Jun 26 08:27:44 2015 +0100

    Successfully implemented Nyan cat 

commit 09713cb7ac9a923b14f8195da6085917f1a11de8
Author: super-villan <super.villan@gmail.com>
Date:   Fri Jun 26 08:26:49 2015 +0100

    Forgot file

commit 1ed4d40105e16862e6f81fd7ce814205ae130c84
Author: super-villan <super.villan@gmail.com>
Date:   Fri Jun 26 08:26:19 2015 +0100

    Experimenting with the Troy Hunt Method

commit a28438857d0982519463cea06016221f407ef1e1
Author: super-villan <super.villan@gmail.com>
Date:   Fri Jun 26 08:25:35 2015 +0100

    Starting to write hackerz code
{% endhighlight %}

These are probably useful to you whilst you are developing the code. To somebody else, in 6 months time, it would be clearer if it was just one commit for the entire feature. 

So before you push to remote why not squash all these commits into one. It’s pretty simple to do:

{% highlight powershell %}
> git rebase -i HEAD~4 
{% endhighlight %}

This will bring up your commit message editor and allow you to squash all the commits into one. Giving them a new commit message:

{% highlight powershell %}
Author: super-villan <super.villan@gmail.com>
Date:   Fri Jun 26 08:27:44 2015 +0100

    Implemented the new hackerz code to add a nyan cat 
{% endhighlight %}

It’s not always a good idea, but it does give you opportunity to clean up your history for the benefit of others.

> Gotcha: You can’t do this if you have already committed to a remote git branch that has others working on it. This will require you to do a forced push to rewrite history which will really annoy you colleagues (trust me :)). However, if you’re working on a branch alone you should be fine.

## Rebase when you pull
See that tweet above? These are what’s known as merge bubbles. These happen when you pull code down from a remote repository and merge it with your own. That in its self is ok but they do cloud your history. They can be easily removed by rebasing as you pull.

Instead of running the command:

{% highlight powershell %}
> git pull origin master
{% endhighlight %}

Just add the rebase argument:

{% highlight powershell %}
> git pull —rebase origin master
{% endhighlight %}

And this will change how the merge works. Rather than taking your code and the remote code, merging them and producing a new commit. It will instead stash all of your local commits, pull down any new, and then attempt to replay your commits on top of the new code.

This will remove the merge bubble (Which if your git history is anything like mine accounts for a large proportion of the commits)

## Be sensible with your commit messages
Don’t just write a one line header saying:

{% highlight powershell %}
Fixed a bug in user code
{% endhighlight %}

That’s not going to be useful to anybody. Try to give a description of what the bug was, how you fixed it and any decisions/assumptions you made. Git gives you a title line and a comments section to work with so you can be as verbose as you like. If possible try and include a case number as well, linking it back to JIRA or whatever bug tracking tool you use: 

{% highlight powershell %}
Case 345: Fixed n + 1 code when retrieving user information

Entity framework lazy loading was yet again causing a inefficiency when retrieving the user data. Fixed the query 
and removed the virtual keyword to prevent this happening again
{% endhighlight %}

You’ll also find if you write messages like this within your commits you don’t need to decorate your code with these comments (comments in code are bad ಠ_ಠ). And the great thing about this is that commit messages are transient. So unlike comments in code they can never be out of date as they were true for a given point in time.

So there you go. These small changes will, hopefully, vastly improve your source code history. Making it easier to find when and why changes were made.

So what do you do to keep your history clean? Or does it not bother you?
