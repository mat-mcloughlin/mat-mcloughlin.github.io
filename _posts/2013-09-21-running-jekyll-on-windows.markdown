---
layout: post
title: Running Jekyll on Windows
date: '2013-09-21 11:00:00'
---

Static blog generators have become very popular recently and with good reason. They are simple without any of the bulk of Wordpress or Blogger and they allow you to host it using providers that don't have any ??server side language. One of the more popular generators is Jekyll. Partly because it is used by GitHub, which just so happens to be place most people host them. There is just one problem with Jekyll though. It can be a little tricky to get it working on Windows. This post will hopefully help you solve this.

__I've highlighted any gotchas in bold__

## Part One: Installing Ruby
Jekyll is a ruby application so thats your first problem. It requires you to install both Ruby and the DevKit on your machine. If you haven't already come across it I highly recommend you use [chocolatey](http://chocolatey.org/) to do this. Its a machine package manager for windows, kind of like apt for Linux. Its so good infact I rarely setup a machine with out it.

To install chocolatey either go to their website or open up Command Prompt and type:

```language-markup
PS> @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin - See more at: http://chocolatey.org/#sthash.DiILbJrZ.dpuf
```

Once this is done you can then go ahead and install [Ruby](http://chocolatey.org/packages/ruby) and the [DevKit](http://chocolatey.org/packages/ruby.devkit.ruby193). 

__You have to be careful at this point as Jekyll runs on version 1.9 NOT 2.0.__

So go ahead and use `cinst`:

```language-markup
PS> cinst ruby -Version 1.9.3.44800
```

And 

```language-markup
PS> cinst ruby.devkit.ruby193
```

## Part Two: Installing Python
Why Python? You need it if you want to use [pygments](http://pygments.org/) which is the library Jekyll uses for syntax highlighting. Python 3.* can cause some problems with Jekyll so unless you planning on using it for anything else you're best sticking to 2.7. So again using `cinst`:

```language-markup
PS> cinst python -Version 2.7.5
```

Next you need to add python to your `PATH` enviroment variable:

Open up Control Panel and click on "System":

![Control Panel](/content/images/2014/Apr/control_panel.png)

Click on "Advanced system settings":

Click on "Enviroment Variables..." (Why the Ellipsis?)

![Environment Variables](/content/images/2014/Apr/environment_variables-1.png)

Then you need to add the path that you installed Python to, to the Path variable. Most likely, if you used Chocolatey, this will mean adding

```language-markup
;C:\python27;
```

__Make sure your variables are delimited by a semi-colon.__

Now the next bit might catch you out. 

__Make sure to close all instances of Command Prompt (or Powershell) and reopen them so your Path variable can be reloaded.__

## Part Three: Installing Jekyll
Now we are already to go-ahead and install Jekyll:

```language-markup
PS> gem install jekyll
```

This will install Jekyll and all its dependencies. At this point it may work for you, however for me I still had problems with the `pygments.rb` gem. At the time I wrote this it didn't work for me. At the time of writing it was at version 0.5.3.

__If at this point Jekyll still doesn't work it you may need to revert to pygments.rb version 0.5.0. To do this__

```language-markup
PS> gem uinstall pygments -v 0.5.3
```

```language-markup
PS> gem install pygments -v 0.5.0
```

## Part Four: Create your Blog
For this section I'm going to refer you to the [official site](http://jekyllrb.com/). Come back when you're done.

## Part Five: Hosting on GitHub
You've got two options here. A simple one and a more complicated one. I'll show you the simple way first and then if you need it you can move onto the more complicated option. 

GitHub allow you to host a website in one of your repositories at the URL `username.github.io`. To set this up you need to create a repository called `username.github.io`. You can then push your newly created blog straight to this repository. The reason you can do this is because GitHub will actually run your application through Jekyll on the server.

__Your blog should have a .gitignore file in the root of your blog that contains the following__

```language-markup
_site/
serve/
```

However, after you've been playing with Jekyll for a while, you probably want to install some plugins. This is where GitHub falls down. It runs Jekyll in safe mode so it will ignore any plugins you install. So you're going to have to start generating the site locally and pushing the compiled site to GitHub. I'm sure there a a couple of ways to do this, but here is my way.

Go to your repository and create a new branch. Call it source:

![Creating Branch](/content/images/2014/Feb/creating_branch.png)

And set it as your default branch. This is so when somebody comes to your git repository they will see this rather than the compiled site

![Setting Default Branch](/content/images/2014/Feb/setting_default_branch.png)

Then create a new file in the route of your blog and call it rake.rb and add the following code:

```language-ruby
require 'rubygems'
require 'jekyll'
require 'tmpdir'

# Change your GitHub reponame
GITHUB_REPONAME = "<your git repository>"
TEMP_DIRECTORY = "<absolute path location to generate your site to>"

desc "Generate blog files"
task :generate do
  system "Jekyll build --source . --destination _site"
end

desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  system "mkdir \"#{TEMP_DIRECTORY}\""
  cp_r "_site/.", TEMP_DIRECTORY
  Dir.chdir TEMP_DIRECTORY
  system "git init"
  system "git add ."
  message = "Site updated at #{Time.now.utc}"
  system "git commit -m \"#{message}\""
  system "git remote add origin https://github.com/#{GITHUB_REPONAME}.git"
  system "git push origin master --force"
  rm_rf TEMP_DIRECTORY
end
```

This Ruby is a ruby rake file, if you want to learn more about it checkout this site. It will give you two commands that you can run from the root of you blog

```language-markup
PS> rake generate
```

That will generate the site and 

```language-markup
PS> rake publish
```

That will generate your site (locally) and copy it into a temporay location (I usually put it in `C:\temp\generate_blog`) and push it to the master branch of your git repository.

__The master branch is the one github uses for your site__

And thats it! Hopefully this will help people where I got stuck. If you have any problems leave a comment and I will try my best to help.

