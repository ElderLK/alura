"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, ListaNegociacoes;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("ListaNegociacoes", ListaNegociacoes = function () {
        function ListaNegociacoes() {
          _classCallCheck(this, ListaNegociacoes);

          this._negociacoes = [];
          // this._armadilha = armadilha;
          // this._context = context;
        }

        _createClass(ListaNegociacoes, [{
          key: "adiciona",
          value: function adiciona(negociacoes) {
            if (Array.isArray(negociacoes)) {
              // negociacoes.forEach(neg => {
              //   this._negociacoes.push(neg);
              // })
              this._negociacoes = this._negociacoes.concat(negociacoes);
            } else {
              this._negociacoes.push(negociacoes);
            }
            // this._armadilha(this);
            // Reflect.apply(this._armadilha, this._context, [this]);
          }
        }, {
          key: "esvazia",
          value: function esvazia() {
            this._negociacoes = [];
            // this._armadilha(this);
            // Reflect.apply(this._armadilha, this._context, [this]);
          }
        }, {
          key: "ordena",
          value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
          }
        }, {
          key: "inverteOrdem",
          value: function inverteOrdem() {
            this._negociacoes.reverse();
          }
        }, {
          key: "negociacoes",
          get: function get() {
            return [].concat(this._negociacoes);
          }
        }]);

        return ListaNegociacoes;
      }());

      _export("ListaNegociacoes", ListaNegociacoes);
    }
  };
});
//# sourceMappingURL=ListaNegociacoes.js.map