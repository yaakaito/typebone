/// <reference path="../src/event.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />

describe('Sample', function(){
  var a;
  beforeEach(function(){
    a = new Backbone.Event();
  });

  it('YES', function(){
      expect(1).to.equal(2);
  })
});

   

   