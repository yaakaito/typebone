/// <reference path="../src/events.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />
/// <reference path="../vendor/underscore.d.ts" />


describe('Backbone.Events', function(){
  it('fire callback if triggered', function(){
    var counter = 0;
    var evt = new Backbone.Events();
    evt.on('event', function(){
      counter += 1;
    });
    evt.trigger('event');
    expect(counter).to.equal(1);
    evt.trigger('event');
    evt.trigger('event');
    evt.trigger('event');
    evt.trigger('event');
    expect(counter).to.equal(5);

    evt.off('event');
    evt.trigger('event');
    expect(counter).to.equal(5);
    
  });

  it('can extendable', function(){
    var obj : {
      counter : number;
      on : Function;
      trigger : Function;
    };
    obj = {
      counter : 0,
      on : null,
      trigger : null
    };
    _.extend(obj, new Backbone.Events()); // :(
    obj.on('event', function() {
      obj.counter += 1;
    });
    obj.trigger('event');
    expect(obj.counter).to.equal(1);
  });

  it('can binding and triggering multiple events', function(){
    var counter = 0;
    var evt = new Backbone.Events();
    evt.on('a b c', function(){
      counter += 1;
    });

    evt.trigger('a');
    expect(counter).to.equal(1);

    evt.trigger('a b');
    expect(counter).to.equal(3);

    evt.trigger('c');
    expect(counter).to.equal(4);

  });

  it('can binding and triggering with event map', function(){
    var counter = 0;
    var evt = new Backbone.Events();
    function incement() : void {
      counter += 1;
    }
    evt.on({
      a : incement,
      b : incement,
      c : incement
    }, evt);

    evt.trigger('a');
    expect(counter).to.equal(1);

    evt.trigger('a b');
    expect(counter).to.equal(3);

    evt.trigger('c');
    expect(counter).to.equal(4);

  });
});

