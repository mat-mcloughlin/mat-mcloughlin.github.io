---
layout: post
title: DD notes
---









Not much really, I want to keep it simple, but given this problem the next step is to come up with our bounded contexts.

> So what is a bounded context?


There are lots of defitions out there but I think the simplest is to define a bounded context by its ubiquitous language. Where the ubiqutous language is a common language used by both developers, domain experts and users.

So in order to define my BC's I really need to define the language first. So let's do that, starting with physical objects:

- __Lobby__ - a place where people go to join a game
- __Game board__ - This is where the game takes placed and is used to represent the current state of play. It usually takes the form of the world.
- __Unit__ - This is a single token representing a players army. It is placed on the board to denote which player occupies which territory (and with how big an army)
- __Territory__ - The board is broken into territories representing all parts of the world
- __Continent__ - All territories are grouped into continents. If a player occupies all territories in a continent they receive more units.
- __Dice__ - There are both attacking and defending dice. Used to decide the out come of battles
- __Game cards__ - These cards are given to players depending on the outcome of their turns.

Next lets look at the verbs used within the context of the game

- __Game__ - This represents the time from deciding who is playing to one player becoming victorious
- __Game setup__ - This is the first part of the game where players take it in turn to occupy a territory
- __Occupying__ - A player is occupying a territory when he places a unit on a territory that has no unit in it.
- __Fortifying__ - When a player places a new unit on a territory they already occupy
- __Turn__ - The time in which a particular player is allowed to make choices
- __Drafting__ - The first stage of the turn where a player gets new units based upon certain criteria
- __Attacking__ - This happens when a player tries to move their units from their territory into an opponents 

There are probably some other terms but I'll keep adding to this list as I go. Now so far there hasn't been any ambiguous terminology so all this can happily sit under one context. However, I've left one concept out. That of the player. 

This because a player can mean two things. In the context of the lobby a player is somebody who is invited to and joins the game. Where as in the context of the game it is somebody who playes turns and eventually wins the game. because of this ambiguity we are going to have to create two bounded contexts:

image of lobby and game contexts.

So this is a better start. Next we need to look at what aggregates and entities should exist within each of our contexts. Hopefully I'll write about that soon.