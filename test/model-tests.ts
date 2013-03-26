/// <reference path="../src/model.ts" />
/// <reference path="../vendor/mocha.d.ts" />
/// <reference path="../vendor/chai.d.ts" />


describe('Backbone.Model', function(){

  it('has Evntable interface', function(){
    var model = new Backbone.Model();
    var counter = 0;
    model.on('event', function(){
      counter += 1;
    });
    model.trigger('event');
    expect(counter).to.equal(1);
    model.trigger('event');
    model.trigger('event');
    expect(counter).to.equal(3);
    model.off('event');
    expect(counter).to.equal(3);
  });

  context('when create with attributes', function(){
    var model;
    beforeEach(function() {
      model = new Backbone.Model({
        'key' : 'value'  
      });
    });

    it('should get attribute by get method', function(){
      expect(model.get('key')).to.equal('value');
    });

    it('should set attribute by set method', function(){
      model.set('key', 'rewrited');
      expect(model.get('key')).to.equal('rewrited');
    });
  });
});