/// <reference path="events.ts" />

module Backbone {
  export class Model implements Eventable {

    private attributes : Object;
    silent : bool = false;

    constructor(attributes? : Object) {
      var attributes = attributes || {};
      attributes['id'] = attributes['id'] || -_.uniqueId();
      this.attributes = attributes;
    }

    get(name : string) : any {
      return this.attributes[name];
    }

    set(name : string, value : any) {
      if (this.attributes[name] !== value) {
        this.attributes[name] = value;
        if (this.silent == false) {
          var eventName = 'change:' + name;
          this.trigger(eventName, this);
          this.trigger('change', this);          
        }
      }
    }

    unset(name : string) {
      this.set(name, null);
    }

    escape(name : string) {
      return _.escape(this.get(name));
    }

    has(name : string) : bool {
      return this.get(name) != null;
    }

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

    trigger(name : string, args? : any) : any {
      this.events.trigger(name, args);
      return this;
    }
  }
}