/// <reference path="../src/events.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />


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
});

