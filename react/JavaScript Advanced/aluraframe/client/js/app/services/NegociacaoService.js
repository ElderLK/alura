'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this._http = new HttpService();
  }

  _createClass(NegociacaoService, [{
    key: 'getNegociacoesSemana',
    value: function getNegociacoesSemana() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._http.get('negociacoes/semana').then(function (response) {
          resolve(response.map(function (obj) {
            return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
          }));
        }).catch(function (error) {
          reject('Não foi possivel obter as negociações da semana atual');
        });
      });
    }
  }, {
    key: 'getNegociacoesSemanaAnterior',
    value: function getNegociacoesSemanaAnterior() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._http.get('negociacoes/anterior').then(function (response) {
          resolve(response.map(function (obj) {
            return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
          }));
        }).catch(function (error) {
          reject('Não foi possivel obter as negociações da semana anterior');
        });
      });
    }
  }, {
    key: 'getNegociacoesSemanaRetrasada',
    value: function getNegociacoesSemanaRetrasada() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._http.get('negociacoes/retrasada').then(function (response) {
          resolve(response.map(function (obj) {
            return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
          }));
        }).catch(function (error) {
          reject('Não foi possivel obter as negociações da semana retrasada');
        });
      });
    }
  }, {
    key: 'cadastra',
    value: function cadastra(negociacao) {
      return ConnectionFactory.getConnection().then(function (conexao) {
        return new NegociacaoDao(conexao);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociação cadastrada com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: 'lista',
    value: function lista() {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível listar as negociações");
      });
    }
  }, {
    key: 'apaga',
    value: function apaga() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.removeTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }, {
    key: 'importa',
    value: function importa(listaNegociacoesAtual) {
      return Promise.all([this.getNegociacoesSemana(), this.getNegociacoesSemanaAnterior(), this.getNegociacoesSemanaRetrasada()]).then(function (negociacoes) {
        return negociacoes.reduce(function (arrayAchatado, array) {
          return arrayAchatado.concat(array);
        }, []).filter(function (negociacao) {
          return !listaNegociacoesAtual.some(function (negociacaoExistente) {
            return negociacao.isEquals(negociacaoExistente);
          });
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map