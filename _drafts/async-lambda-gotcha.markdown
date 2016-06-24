---
layout: post
title: Unable to await a lambda expression
---

As mentioned in this post you should never return `void` from `async` methods as it give you no way to check that the method has completed. So instead you should always return `Task`. I think most people know this now but what about async lambdas.

Take this method for example and how it is called:

```language-csharp
public async Task<int> BatchProcess(List<string> items, Action<string> action)
{
    foreach(var item in items)
    {
        await action(item);
    }
}

await BatchProcess(items, async item => await DoSomethingAsync(item)); 
```

Seems ok right? doesn't show any warnings or errors. However there is a problem. Because the lambda you are passing into the method is an `Action<T>` then its going to return void. And as I mentioned above this means we won't know when the method completes and in turn we wont be able to await it and in turn we can't await the `BatchProcess()` method either. This can lead to some very confusing problems as I learnt to my cost :(.

So whats the solution? Well its the same as with a standard method, just return Task by using `Func<T>` instead:

```language-csharp
public async Task<int> BatchProcess(List<string> items, Func<string, Task> action)
{
    foreach(var item in items)
    {
        await action(item);
    }
}

await BatchProcess(items, async item => await DoSomethingAsync(item)); 
```

So watch out for this one. No errors or warnings and it can quickly become frustrating.
