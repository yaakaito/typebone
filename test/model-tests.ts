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

    it('should `has` retruns true if the property defined', function(){
      expect(model.has('key')).to.be.true;
      expect(model.has('undef')).to.be.false;
    });

    it('should be fire change event if attribute changed', function(){
      var changed = false;
      model.on('change', function(){
        changed = true;
      });
      model.set('key', 'rewrited');
      expect(changed).to.be.true;
    });

    it('should not be fire change event if attribute not changed', function(){
      var changed = false;
      model.on('change', function(){
        changed = true;  
      });
      model.set('key', 'value');
      expect(changed).to.be.false;
    });

    it('should be fire change:{changed-value} event if attribute changed', function(){
      var changed = false;
      model.on('change:key', function(){
        changed = true;
      });
      model.set('key', 'rewrited');
      expect(changed).to.be.true;
    });

    it('should not be fire change:{changed-value} event if attribute not changed', function(){
      var changed = false;
      model.on('change:key', function(){
        changed = true;  
      });
      model.set('key', 'value');
      expect(changed).to.be.false;
    });

  });
});