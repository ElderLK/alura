export class ListaNegociacoes{

  constructor() {
    this._negociacoes = [];
    // this._armadilha = armadilha;
    // this._context = context;
  }

  adiciona(negociacoes) {
    if(Array.isArray(negociacoes)){
      // negociacoes.forEach(neg => {
      //   this._negociacoes.push(neg);
      // })
      this._negociacoes = this._negociacoes.concat(negociacoes)
    } else {
      this._negociacoes.push(negociacoes);
    }
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

  ordena(criterio) {
    this._negociacoes.sort(criterio);        
  }

  inverteOrdem() {
    this._negociacoes.reverse();
  }

}