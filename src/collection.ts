/// <reference path="model.ts" />

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

    filter(callbackb : (element: any, index?: number, list?: any[]) => bool) : Array {
      return null;
    }

    without(...values : any[]) : any[] {
      return null;
    }
  }
}
