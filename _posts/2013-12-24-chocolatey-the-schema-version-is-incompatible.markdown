---
layout: post
title: 'Chocolatey: The schema version is incompatible'
date: '2013-12-24 12:00:00'
tags:
- fix
---

I love [Chocolatey](http://chocolatey.org/). It's a machine package manager for windows and I use it to install all my applications now. However, every once in a while I come across this error. There may be a better way to fix it, but this works for me.

Sometimes when I try to install a new application I get the following error:

```language-markup
C:\> cinst spotify
Chocolatey (v0.9.8.20) is installing spotify and dependencies. By installing you accept the license for spotify and each dependency you are installing.
The schema version of 'SimpleAuthentication.Mvc4' is incompatible with version 2.1.31022.9038 of NuGet. Please upgrade NuGet to the latest version from http://go.microsoft.com/fwlink/?LinkId=213942.
```

The schema version that is incompatible doesn't matter, it's different every time. To solve the problem you just need to update the nuget version in the chocolatey folder. This is normally located in `C:\Chocolatey\chocolateyinstall`:

```language-markup
C:\Chocolatey\chocolateyinstall> nuget update -Self
Checking for updates from https://nuget.org/api/v2/.
Currently running NuGet.exe 2.1.0.
Updating NuGet.exe to 2.7.3.
Update successful.
```

And that should get rid of your problem. It seems strange that there should be a conflict with a package I installed whilst using Visual Studio when I want to install one via Chocolatey. 
