/// <reference path="../vendor/underscore.d.ts" />

module Backbone {

  class Event {
    
    callbacks : Function[] = [];
    name : string;

    constructor(name : string) {
      this.name = name;
    }

    addCallback(callback : Function) {
      this.callbacks.push(callback);
    }

    fire() : void {
      _.each(this.callbacks, function(callback : Function){
        callback();
      });
    }
  }

  // Multiple event name.
  class EventName {
    
    private components : string[] = [];

    constructor(name : string) {
      this.components = EventName.parseName(name);
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

    constructor(table : EventTable, eventName : EventName) {
      var that = this;
      eventName.scan(function(aName){
        if (table.has(aName)) {
          that.events.push(table.get(aName));
        }
      });
    }

    fire() : void {
      _.each(this.events, function(event : Event){
        event.fire();
      });
    }
  }

  class EventTable {
    events : {} = {};

    get(name : string) : Event {
      return this.events[name];
    }

    has(name : string) : bool {
      return this.get(name)? true : false;
    }

    // TODO: define callback function type literals
    private createEvent(name : string, callback : Function) : void {
      var theEvent = new Event(name);
      theEvent.addCallback(callback);
      this.events[name] = theEvent;
    }

    private registerCallback(name : string, callback : Function) : void {
      this.get(name).addCallback(callback);
    }

    private fireables(eventName : EventName) : FireableEventList {
      return new FireableEventList(this, eventName);
    }

    // Interface for Backbone.Events
    register(eventName : EventName, callback : Function) : void {
      // TODO: refactor
      var that = this;
      eventName.scan(function(aName){
        if (that.has(aName)) {
          that.registerCallback(aName, callback);
        }
        else {
          that.createEvent(aName, callback);
        }
      });
    }

    fire(eventName : EventName) : void {
      this.fireables(eventName).fire();
    }
  }

  /*
   *  Backbone.Events
   */
  export class Events {

    eventTable : EventTable = new EventTable();

    on(name : string, callback : Function) : Events;
    on(map : any, context : Events) : Events;
    on(map : any, callback : any) : Events {
      if (typeof map == "string") {
        this.eventTable.register(new EventName(map), callback);        
      }
      else {
        var that = this;
        _.each(<Object>map, function(aCallback: Function, aName?: string){
          that.on(aName, aCallback);
        });
      }
      return this;
    }

    trigger(name : string) : Events {
      this.eventTable.fire(new EventName(name));
      return this;
    }
  }
}