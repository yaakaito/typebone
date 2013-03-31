module Backbone {
  export class Collection {
    model : Function = null;
    models : Array = null;
    constructor(models? : Array) {
      if (models) {
        this.models = models;
      }
    }

    get(index : number) : any {
      return this.models[index];
    }
  }
}
