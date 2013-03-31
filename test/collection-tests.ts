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
    collection = new TestModels([a, b, c, d, e]);
  });

  it('should get model with index', () => {
    expect(collection.get(0)).to.equal(a);
    expect(collection.get(1)).to.equal(b);
    expect(collection.get(2)).to.equal(c);
    expect(collection.get(3)).to.equal(d);
    expect(collection.get(4)).to.equal(e);
  });

  it('has raw models', () => {
    expect(collection.models[0]).to.equal(a);
    expect(collection.models[1]).to.equal(b);
    expect(collection.models[2]).to.equal(c);
    expect(collection.models[3]).to.equal(d);
    expect(collection.models[4]).to.equal(e);
  });
});