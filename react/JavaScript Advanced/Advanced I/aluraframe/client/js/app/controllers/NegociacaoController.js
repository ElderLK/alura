class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
  }

  adiciona(event){
    event.preventDefault();
    let negociacao = new Negociacao(
      this._inputData.value.split('-'),
      this._inputQuatidade.value,
      this._inputValor.value
    );
  }
}