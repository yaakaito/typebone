/// <reference path="../src/events.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />
/// <reference path="../vendor/underscore.d.ts" />


describe('Backbone.Events', () => {

  it('fire callback if triggered', () => {
    var obj : { counter : number; on : Function; off : Function; trigger : Function; };
    obj = {
      counter : 0,
      on : null,
      off : null,
      trigger : null,
    };
    _.extend(obj, Backbone.Events);

    obj.on('event', () => {
      obj.counter += 1;
    });
    obj.trigger('event');
    expect(obj.counter).to.equal(1);
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    expect(obj.counter).to.equal(5);

    obj.off('event');
    obj.trigger('event');
    expect(obj.counter).to.equal(5);

  });

  it('can binding and triggering multiple events', () => {
    var obj : { counter : number; on : Function; off : Function; trigger : Function; };
    obj = {
      counter : 0,
      on : null,
      off : null,
      trigger : null,
    };
    _.extend(obj, Backbone.Events);

    obj.on('a b c', () => {
      obj.counter += 1;
    });

    obj.trigger('a');
    expect(obj.counter).to.equal(1);

    obj.trigger('a b');
    expect(obj.counter).to.equal(3);

    obj.trigger('c');
    expect(obj.counter).to.equal(4);

    obj.off('a b');
    obj.trigger('a b c');
    expect(obj.counter).to.equal(5);

  });

  it('can binding and triggering with event map', () => {
    var obj : { counter : number; on : Function; off : Function; trigger : Function; };
    obj = {
      counter : 0,
      on : null,
      off : null,
      trigger : null,
    };
    _.extend(obj, Backbone.Events);

    var incement = function(evt) : any {
      this.counter += 1;
    };

    obj.on({
      a : incement,
      b : incement,
      c : incement
    }, obj);

    obj.trigger('a');
    expect(obj.counter).to.equal(1);

    obj.trigger('a b');
    expect(obj.counter).to.equal(3);

    obj.trigger('c');
    expect(obj.counter).to.equal(4);

    obj.off({
      a : incement,
      c : incement
    }, obj);
    obj.trigger('a b c');
    expect(obj.counter).to.equal(5);

  });

  it('fire `all` callback if triggered any events', () =>  {
    var obj : { counter : number; on : Function; off : Function; trigger : Function; };
    obj = {
      counter : 0,
      on : null,
      off : null,
      trigger : null,
    };
    _.extend(obj, Backbone.Events);

    var a = false, b = false;
    obj.on('all', function(evt) {
      obj.counter += 1;
      if (evt == 'a') {
        a = true;
      }

      if (evt == 'b') {
        b = true;
      }
    }).trigger('a b');
    expect(a).to.be.true;
    expect(b).to.be.true;
    expect(obj.counter).to.equal(2);
  });
});

