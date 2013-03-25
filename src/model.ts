/// <reference path="events.ts" />

module Backbone {
  export class Model implements Eventable {
    /*
     * Eventable
     */
    private events = Backbone.Events;
    on(events : any, callback : any, context? : any) : any {
      this.events.on(events, callback, context);
      return this;
    }
  
    off(events : any, callback? : any, context? : any) : any {
      this.events.off(events, callback, context);
      return this;
    }

    trigger(name : string) : any {
      this.events.trigger(name);
      return this;
    }
  }
}