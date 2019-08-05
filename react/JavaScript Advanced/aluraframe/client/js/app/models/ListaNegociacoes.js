class ListaNegociacoes{

  constructor() {
    this._negociacoes = [];
    // this._armadilha = armadilha;
    // this._context = context;
  }

  adiciona(negociacoes) {
    this._negociacoes.push(negociacoes);
    // this._armadilha(this);
    // Reflect.apply(this._armadilha, this._context, [this]);
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  esvazia() {
    this._negociacoes = [];
    // this._armadilha(this);
    // Reflect.apply(this._armadilha, this._context, [this]);
  }

}