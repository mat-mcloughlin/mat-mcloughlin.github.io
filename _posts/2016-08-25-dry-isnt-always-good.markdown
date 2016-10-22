---
layout: post
title: dry isn't always best
date: 2016-08-04
featured:
image: /content/images/2016/8/ndc.jpg
tags:
- architecture
---

There has been this concept of making your code dry for a long time now and usually I abide by the sentement. The idea being that you should avoid code duplication to help with maintanance and readability later on. For example if you have two sections of code that each need to format a date in a particular way it makes sense to extract that code into a seperate method/class so that you don't have to maintain it in two seperate places. It also means you don't have to change it in multiple places too. 

(Image showing to blocks of code joining in to onep)[]

But is this always a good thing? As well as reducing the complexity of the code you've also just coupled these two sections of code together. They are now dependendent on the same method and what happens if you want to change this method for one but not the other? It might seem simple in this instance to just create a new method. But in large complex systems this can become tricky. 

Lets look at another example.

(Some image)[]
