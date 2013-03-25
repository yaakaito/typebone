/// <reference path="../vendor/underscore.d.ts" />

module Backbone {

  /*
   * Inner modules.
   */

  class Event {
    
    callbacks : EventCallback[] = [];
    name : string;

    constructor(name : string) {
      this.name = name;
    }

    addCallback(callback : EventCallback) {
      this.callbacks.push(callback);
    }

    removeCallback(callback : EventCallback) {
      this.callbacks = _.reject(this.callbacks, function(aCallback : EventCallback){
        return callback.equals(aCallback);
      });
    }

    fire(e : string) : void {
      _.each(this.callbacks, function(callback : EventCallback){
        callback.fire(e);
      });
    }
  }

  class EventCallback {

    real : Function;
    context: any = null;

    constructor(real : Function, context? : any) {
      this.real = real;
      this.context = context;
    }

    fire(e) : void {
      this.real.apply(this.context || Events, [e]);
    }

    equals(right : EventCallback) : bool {

      if (right.context != undefined) {
        return this.real == right.real && this.context == right.context;
      }
      else {
        return this.real == right.real;
      }
    }
  }

  // Multiple event name.
  class MultipleEventName {
    
    private components : string[] = [];

    constructor(name : string) {
      this.components = MultipleEventName.parseName(name);
    }

    private static parseName(name : string) : string[] {
      return name.split(/\s+/);
    }

    scan(callback : (element : any)=>any) : void {
      _.each(this.components, callback);
    }

  }

  class FireableEventList {
    private events : Event[] = [];
    private name : string = null;

    constructor(table : EventTable, name : string) {
      if (table.has(name)) {
        this.events.push(table.get(name));
      }
      
      var all = table.all();
      if (all) {
        this.events.push(all);
      }

      this.name = name;
    }

    fire() : void {
      var name = this.name;
      _.each(this.events, function(event : Event){
        event.fire(name);
      });
    }
  }

  class EventTable {

    private events : {} = {};

    get(name : string) : Event {
      return this.events[name];
    }

    has(name : string) : bool {
      return this.get(name) ? true : false;
    }

    all() : Event {
      if (this.has('all')) {
        return this.get('all');
      }
      return null;
    }

    // TODO: define callback function type literals
    private createEvent(name : string, callback : Function, context : any) : void {
      var theEvent = new Event(name);
      theEvent.addCallback(new EventCallback(callback, context));
      this.events[name] = theEvent;
    }

    private registerCallback(name : string, callback : Function, context : any) : void {
      this.get(name).addCallback(new EventCallback(callback, context));
    }

    private unregisterEvent(name : string, callback : Function, context: any) : void {
      if (callback === undefined) {
        this.events[name] = null;
      }
      else {
        this.get(name).removeCallback(new EventCallback(callback, context));
      }    
    }

    // Interface for Backbone.Events
    register(eventName : MultipleEventName, callback : Function, context: any) : void {
      // TODO: refactor
      var that = this;
      eventName.scan(function(aName : string){
        if (that.has(aName)) {
          that.registerCallback(aName, callback, context);
        }
        else {
          that.createEvent(aName, callback, context);
        }
      });
    }

    unregister(eventName : MultipleEventName, callback : Function, context : any) : void {
      var that = this;
      eventName.scan(function(aName : string){
        if (that.has(aName)) {
          that.unregisterEvent(aName, callback, context);
        }
      }); 
    }

    fire(eventName : MultipleEventName) : void {
      var that = this;
      eventName.scan(function(aName : string){
         var fireables = new FireableEventList(that, aName);
         fireables.fire();
      });
    }
  }

  /*
   *  Backbone.Events
   */

  export interface Eventable {
    on(name : string, callback : Function, context : any) : any;
    on(map : any, context : any) : any;
    off(name : string, callback? : Function, context? : any) : any;
    off(map : any, context : any) : any;
    trigger(name : string) : any;
  }

  class BackboneEvents implements  Eventable {
    private eventTable : EventTable;

    constructor() {
      this.eventTable = new EventTable();
    }


    on(events : any, callback : any, context? : any) : any {

      if (typeof events == "string") {
        this.eventTable.register(new MultipleEventName(events), callback, context);        
      }
      else {
        var that = this;
        _.each(<Object>events, function(aCallback: Function, aName?: string){
          that.on(aName, aCallback, callback);
        });
      }
      return this;
    }
  

    off(map : any, callback? : any, context? : any) : any {
      if (typeof map == "string") {
        this.eventTable.unregister(new MultipleEventName(map), callback, context);
      }
      else {
        var that = this;
        _.each(<Object>map, function(aCallback : Function, aName? : string){
          that.off(aName, aCallback, callback);
        });
      }
      return this;
    }

    trigger(name : string) : any {
      this.eventTable.fire(new MultipleEventName(name));
      return this;
    }
  };

  export var Events : Eventable;
  Events = new BackboneEvents();

}
/*
module Backbone {
  export var Events = Backbone.Event.Events;
}*/