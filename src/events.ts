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

  class EventList {
    events : Event[] = [];

    private get(name : string) : Event {
      return this.events[name];
    }

    private createEvent(name : string, callback : Function) : void {
      var theEvent = new Event(name);
      theEvent.addCallback(callback);
      this.events[name] = theEvent;
    }

    private registerCallback(name : string, callback : Function) : void {
      this.get(name).addCallback(callback);
    }

    register(name : string, callback : Function) : void {
      if (this.has(name)) {
        this.registerCallback(name, callback);
      }
      else {
        this.createEvent(name, callback);
      }
    } 

    has(name : string) : bool {
      return this.get(name)? true : false;
    }

    fire(name : string) : void {
      this.get(name).fire();
    }
  }

  /*
   *  Backbone.Events
   */
  export class Events {

    eventList : EventList = new EventList();

    on(name: string, callback: Function) : Events {
      this.eventList.register(name, callback);
      return this;
    }

    trigger(name: string) : Events {
      this.eventList.fire(name);
      return this;
    }
  }
}