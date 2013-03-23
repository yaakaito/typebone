module Backbone {
  export class Events {

    events : array = null;

    on(name: string, callback: Function) : Events {
      this.events = this.events || (this.evetns = {});
      var theEvents = this.events[name] || (this.events[name] = [])
      theEvents.push(callback);

      return this;
    }

    trigger(name: string) : Events {
      if (!this.events) { 
        return this;
      }

      var theEvents = this.events[name];

      for (var i = 0; i < theEvents.length; i++) {
        theEvents[i]();
      }

      return this;
    }
  }
}