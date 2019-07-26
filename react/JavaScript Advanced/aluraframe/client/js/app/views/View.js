class View{
  constructor(elemento){
    this._elemento = elemento;
  }

  _template(model) { throw new Error('Implementar _template');}

  update(model){
    this._elemento.innerHTML = this._template(model);
  }
}