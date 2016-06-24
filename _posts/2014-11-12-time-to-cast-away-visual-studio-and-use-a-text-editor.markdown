---
layout: post
title: Time to cast away Visual Studio and use a text editor
date: '2014-11-12 14:32:57'
---

I've been working on an OSS project for the past couple of weeks that I'm really excited about. It's a project that is going to allow you to effectively write .Net code outside of Visual Studio and it's called Omnisharp. 

## To give a little bit of background
It all started as an effort from a guy called [@JasonImison](https://twitter.com/JasonImison)  and his frustrations with not being able to write C# code in his favourite editor, VIM. And with the help of [NRefactory](https://github.com/icsharpcode/NRefactory) he was able to write a local http service that, when given a C# project would provide you with functionality such as intellisense, refactoring, error checking and more. He was then able to use this service to write a VIM plugin and never was Visual Studio opened again (well, not very often). This was all [2 years ago](https://twitter.com/JasonImison/status/296032641646469120).

Move forward to 2 months ago and I got involved via [@jchannon](https://twitter.com/jchannon) with a group of people who were hoping to bring this functionality to all of popular text editors. One Skype call later and I was set to work on the [brackets.io](http://brackets.io/) plugin

## The Brackets.io plugin
I'll be honest. I was late to the game when I started working on the brackets plugin so it doesn't currently have all the functionality of the text editors but I'm hoping to add it soon. But what it does have is pretty cool:

### Intellisense
![](/content/images/2014/Nov/Intellisense.gif)

### Syntax checking and highlighting
![](/content/images/2014/Nov/error.gif)

### Go to definition
![](/content/images/2014/Nov/gotoDefinition.gif)

### Format document
![](/content/images/2014/Nov/formatCode.gif)

### Fix usings
![](/content/images/2014/Nov/fixUsings.gif)

It's been a little slow to get started but the main functionality is there so the new features should be coming thick and fast.

__You can get hold of the package via brackets inbuilt extension manager.__

## The rest of Omnisharp
As I mentioned above its not just the brackets plugin. We have plugins for:

- Sublime
- Atom
- Vim
- Emacs
- Brackets

All nicely hosted under the one [Github repository](https://github.com/OmniSharp) so you can go check them all out there. You'll also be able to see the rest of the people involved in the project. We've been very fortunate to have support and help from @Sayed and @Scott on this project as well.

We also have a [website](http://www.omnisharp.net/) and [twitter account](https://twitter.com/omnisharp)

You can also find out more about the sublime plugin [here](http://blog.jonathanchannon.com/2014/11/12/csharp-first-class-citizen-sublime-text/) and the atom plugin [here](http://localghost.io/articles/getting-your-c-sharp-on-with-atom-2014-11-12/)

## The Future
So what's next? Well all the editor plugins (with, maybe, the exception of Vim) so we'll be looking to improve them as, hopefully, more people use them. 

Also with the new developments in the .Net space we will be looking to use tools such as the Design time host and Roslyn to improve functionality.
