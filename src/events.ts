/// <reference path="../vendor/underscore.d.ts" />

module Backbone {

  /*
   *  Backbone.Events
   */
  export var Events : {
    eventTable : EventTable;

    on(name : string, callback : Function, context : any) : any;
    on(map : any, context : any) : any;
  
    off(name : string, callback? : Function, context? : any) : any;
    off(map : any, context : any) : any;

    trigger(name : string) : any;
  };

  Events = {
    eventTable : null,

    on : function(events : any, callback : any, context? : any) {
      if (!this.eventTable) {
        this.eventTable = new EventTable();
      }

      if (typeof events == "string") {
        this.eventTable.register(new EventName(events), callback, context);        
      }
      else {
        var that = this;
        _.each(<Object>events, function(aCallback: Function, aName?: string){
          that.on(aName, aCallback, callback);
        });
      }
      return this;
    },

    off : function(map : any, callback? : any, context? : any) {
      if (typeof map == "string") {
        this.eventTable.unregister(new EventName(map), callback, context);
      }
      else {
        var that = this;
        _.each(<Object>map, function(aCallback : Function, aName? : string){
          that.off(aName, aCallback, callback);
        });
      }
      return this;
    },

    trigger : function(name : string) {
      this.eventTable.fire(new EventName(name));
      return this;
    }
  };

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

    fire() : void {
      _.each(this.callbacks, function(callback : EventCallback){
        callback.fire();
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

    fire() : void {
      this.real.apply(this.context || Events);
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
      return this.get(name) ? true : false;
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

    private fireables(eventName : EventName) : FireableEventList {
      return new FireableEventList(this, eventName);
    }

    // Interface for Backbone.Events
    register(eventName : EventName, callback : Function, context: any) : void {
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

    unregister(eventName : EventName, callback : Function, context : any) : void {
      var that = this;
      eventName.scan(function(aName : string){
        if (that.has(aName)) {
          that.unregisterEvent(aName, callback, context);
        }
      }); 
    }

    fire(eventName : EventName) : void {
      this.fireables(eventName).fire();
    }
  }

}