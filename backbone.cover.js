// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "backbone.js",[1,2,3,5,7,10,11,12,14,16]);
_$jscoverage_init(_$jscoverage_cond, "backbone.js",[]);
_$jscoverage["backbone.js"].source = ["var Backbone;","(function (Backbone) {","    var Event = (function () {","        function Event() { }","        return Event;","    })();","    Backbone.Event = Event;    ","})(Backbone || (Backbone = {}));","","var Backbone;","(function (Backbone) {","    var Model = (function () {","        function Model() { }","        return Model;","    })();","    Backbone.Model = Model;    ","})(Backbone || (Backbone = {}));","",""];
_$jscoverage_done("backbone.js", 1);
var Backbone;

_$jscoverage_done("backbone.js", 2);
(function(Backbone) {
    _$jscoverage_done("backbone.js", 3);
    var Event = function() {
        function Event() {}
        _$jscoverage_done("backbone.js", 5);
        return Event;
    }();
    _$jscoverage_done("backbone.js", 7);
    Backbone.Event = Event;
})(Backbone || (Backbone = {}));

_$jscoverage_done("backbone.js", 10);
var Backbone;

_$jscoverage_done("backbone.js", 11);
(function(Backbone) {
    _$jscoverage_done("backbone.js", 12);
    var Model = function() {
        function Model() {}
        _$jscoverage_done("backbone.js", 14);
        return Model;
    }();
    _$jscoverage_done("backbone.js", 16);
    Backbone.Model = Model;
})(Backbone || (Backbone = {}));