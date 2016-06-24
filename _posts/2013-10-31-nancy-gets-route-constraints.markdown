---
layout: post
title: Nancy gets Route Constraints
date: '2013-10-31 12:00:00'
tags:
- c
- nancyfx
---

A couple of people have been after this for a while so I thought I would implement it. This update will give Nancy the ability to have routes that are only called if the parameter of the route fits certain criteria.

The format for the constraints has been copied from the recent WebAPI release. Its really easy to use. All you have to do is define the parameter name and the constraint as part of the route. For example:

```language-csharp
Get["/{name:string}"] = parameters => return parameters.Name + " is a string";
```

This isn't in the prod version of Nancy yet but you can get hold of it in the [NancyFX bleeding edge builds](https://www.myget.org/gallery/nancyfx) nuget package

The constraints available to you are:

<table>
	<tr>
		<th>Constraint</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>{value:int}</code></td>
		<td>Must be an integer value (long is used so any size int can be used_</td>
	</tr>
	<tr>
		<td><code>{value:decimal}</code></td>
		<td>Must be have decimal place</td>
	</tr>
	<tr>
		<td><code>{value:guid}</code></td>
		<td>Must be a GUID</td>
	</tr>
	<tr>
		<td><code>{value:bool}</code></td>
		<td>Must be either true or false</td>
	</tr>
	<tr>
		<td><code>{value:alpha}</code></td>
		<td>Must contain only alpha characters</td>
	</tr>
	<tr>
		<td><code>{value:datetime}</code></td>
		<td>Must be date time formatted string</td>
	</tr>
	<tr>
		<td><code>{value:min(n)}</code></td>
		<td>Must be a numeric greater than <i>n</i>	</td>
	</tr>
	<tr>
		<td><code>{value:max(n)}</code></td>
		<td>Must be numeric less than <i>n</i></td>
	</tr>
	<tr>
		<td><code>{value:range(n,m)}</code></td>
		<td>Must be a numeric between <i>n</i> and <i>m</i></td>
	</tr>
	<tr>
		<td><code>{value:minlength(n)}</code></td>
		<td>Must be string of length greater than <i>n</i></td>
	</tr>
	<tr>
		<td><code>{value:maxlength(n)}</code></td>
		<td>Must be string of length less than <i>n</i></td>
	</tr>
	<tr>
		<td><code>{value:length(n,m)}</code></td>
		<td>Must be string of length between <i>n</i> and <i>m</i></td>
	</tr>
</table>

If you've looked at the WebAPI implementation of this you may have noticed there are some other options such as _long_ and _float_ that are not included here. I don't think these are really necessary as distinguishing between them isn't really useful for route paramters. better to just have _int_ and _decimal_. However I will point out that `{value:int}` does use long so that any size of integer can be used.

As an example to where this is useful. Imagine you want the same route to find a product, but you want to allow a user to use a product id or a product name. The following example will allow you to do that:

```language-csharp
public class ProductModule : NancyModule {
    public ProductModule(IProductRepository productRepository)
    { 
        Get["/product/{name:alpha}"] = parameter => productRepository.GetProductByName(parameter.Name);

        Get["/product/{id:int}"] = parameter => productRepository.GetProductById(parameter.Id);
    }
} 
```

I'll let you know when this comes out of beta.