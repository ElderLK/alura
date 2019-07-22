class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
  }

  adiciona(event){
    event.preventDefault();

    let data = DateHelper.textoParaData(this._inputData.value);

    let negociacao = new Negociacao(
      data,
      this._inputQuatidade.value,
      this._inputValor.value
    );

    console.log(data)

    console.log(DateHelper.dataParaTexto(data))
  }
}