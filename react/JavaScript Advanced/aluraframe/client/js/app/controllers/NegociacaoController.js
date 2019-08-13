class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem' 
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );

    this._ordemAtual = '';
  }

  adiciona(event){
    event.preventDefault();
    try {
      this._listaNegociacoes.adiciona(this._criaNegociacao());

      this._mensagem.texto = 'Negociação add com sucesso';

      this._limpaForulatio();
    }catch(error){
      this._mensagem.texto = error;
    }
  }

  apaga(){
    this._listaNegociacoes.esvazia();
    // this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociação removida com sucesso';
  }

  importarNegociacoes(){
    let service = new NegociacaoService();

    Promise.all([
      service.getNegociacoesSemana(),  
      service.getNegociacoesSemanaAnterior(), 
      service.getNegociacoesSemanaRetrasada()
    ]).then((negociacoes) => {
      negociacoes
        .reduce( (arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacções da semana importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });

  }
  
  ordena(coluna) {
    if(this._ordemAtual == coluna) {
        this._listaNegociacoes.inverteOrdem();
    } else {
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
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