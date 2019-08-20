class View{
  constructor(elemento){
    this._elemento = elemento;
  }

  template() { throw new Error('Implementar template');}

  update(model){
    this._elemento.innerHTML = this.template(model);
  }
}