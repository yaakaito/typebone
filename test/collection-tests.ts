/// <reference path="../src/model.ts" />
/// <reference path="../src/collection.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />

class TestModel extends Backbone.Model {
  constructor(label : string) {
    super({
      'label' : label  
    });
  }
}

class TestModels extends Backbone.Collection {
  model : Function = TestModel;
}

describe('Backbone.Collection', () => {
  var a, b, c, d, e,
      collection;
  beforeEach(() => {
    a = new TestModel('a');
    b = new TestModel('b');
    c = new TestModel('c');
    d = new TestModel('d');
    e = new TestModel('e');
    collection = new TestModels([a, b, c, d]);
  });

  it('should get model', () => {
    expect(collection.get(0)).to.equal(a);
  });
});