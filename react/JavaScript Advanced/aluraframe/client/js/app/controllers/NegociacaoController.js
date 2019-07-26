class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes(function(model){
      this._negociacoesView.update(model);
    });
    
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);
    
    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    // this._mensagemView.update(this._mensagem);

  }

  adiciona(event){
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    // this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociação add com sucesso';
    this._mensagemView.update(this._mensagem);

    this._limpaForulatio();
  }

  apaga(){
    this._listaNegociacoes.esvazia();
    // this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociação removida com sucesso';
    this._mensagemView.update(this._mensagem);

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