class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);
  }

  adiciona(event){
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._listaNegociacoes);
    this._limpaForulatio();
  }

  _criaNegociacao() {
    let data = DateHelper.textoParaData(this._inputData.value);

    return new Negociacao(
      data,
      this._inputQuatidade.value,
      this._inputValor.value
    );
  }

  _limpaForulatio() {
    this._inputData.value='';
    this._inputQuatidade.value = 1;
    this._inputValor.value = 0.0;
    
    this._inputData.focus();
  }


}