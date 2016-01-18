# player-pings-webapp
Oh, cool! It's an app where friends can specify what games they're interested in, and invite friends to play with them!

It probably doesn't quite do all of that yet.


## Getting started

This is a [Meteor](https://www.meteor.com/) app, so, hey, that's fun!
Keeping in sync with the database is trivial, and also incredibly insecure, but that's okay.
After all, what's security among friends?

After you install Meteor, navigate to the app's root directory and run `meteor`.
That'll start a local copy of the app on [localhost:3000](http://localhost:3000).
When you change the code, the app will automatically recompile, then refresh the browser window.


## Architecture

This is an MVC app built on React, using conventions that I totally made up so you won't find references elsewhere online. Convenient!
* A view is a pure React component.
  * By "pure", I mean that it must not directly interact with some global service.
    * It receives props from its parent, and sends events to its parent via callbacks; that's it.
    * It doesn't touch the models, it doesn't touch the router—heck, it doesn't even know it's in a Meteor app.
    * That is, we could trivially copy-paste these views into any application. Yay, decoupling!
  * It _may_ contain state, but that state must be relevant only to the component and its children.
    * i.e., "Are you sure you want to delete this thing? Yes / No"
* A controller is an incredibly impure React component.
  * It receives information from some models, and passes that information to some views.
  * Whenever the model changes, Meteor automatically re-renders the controller, which in turn re-renders the views.
    That is, the view is always in sync with the model; no need to attach "plz update view" boilerplate to every single event! Wow!
    * Here's how the magic works:
      1. A controller declares a `getMeteorData` method, which is the only place where it's allowed to read from a model.
      2. The first time we render the controller, the Meteor client watches `getMeteorData` in particular.
         It tracks any database queries made during that call, and asks the Meteor server to subscribe to the results of those queries.
      3. Whenever the results of those queries change, the Meteor server forwards the results to the Meteor client,
         and the client then re-renders the controller with the new data.
    * That is, when you click the checkbox next to a game you like, we don't actually toggle the checkbox directly within the view.
      Instead, we send an event up to the model, and then re-render the view based on the model's new state.
      That way, there's exactly one piece of code that affects whether the checkbox should be checked or not.
      Boom! Less code to write, _and_ we decrease the mental overhead required to reason about the checkbox's state.
  * The controller also talks to the router, which manages the mapping between URLs and the controller we should therefore render.
* A model is a wrapper around a MongoDB database collection. Nothing fancy happening here.

So, yeah! With a basic understanding of React and unidirectional data flow, you'll be equipped to work on this app. Onward!
