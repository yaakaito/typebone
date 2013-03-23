/// <reference path="../src/events.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />
/// <reference path="../vendor/underscore.d.ts" />


describe('Backbone.Events', function(){
  it('can fire `on` callback if triggered', function(){
    var counter = 0;
    var obj = new Backbone.Events();
    obj.on('event', function(){
      counter += 1;
    });
    obj.trigger('event');
    expect(counter).to.equal(1);
  });

  it('can extendable', function(){
    var obj = { counter: 0 }
    _.extend(obj, new Backbone.Events()); // :(
    obj.on('event', function() {
      obj.counter += 1;
    });
    obj.trigger('event');
    expect(obj.counter).to.equal(1);
  });
});

