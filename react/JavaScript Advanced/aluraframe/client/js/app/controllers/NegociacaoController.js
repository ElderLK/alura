class NegociacaoController{

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputQuatidade = $('#quantidade');
    this._inputData = $('#data');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );
  
  }

  adiciona(event){
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    // this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem.texto = 'Negociação add com sucesso';

    this._limpaForulatio();
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
      console.log(negociacoes);
      negociacoes
        .reduce( (arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacções da semana importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });

    /*
    
    service.getNegociacoesSemana()
    .then((negociacoes) => {
      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacções da semana importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });

    service.getNegociacoesSemanaAnterior()
    .then((negociacoes) => {
      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacções da semana anterior importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });

    service.getNegociacoesSemanaRetrasada()
    .then((negociacoes) => {
      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacções da semana restrasada importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });
  
    service.getNegociacoesSemana( (err, negociacoes) => {
      if(err){
        this._mensagem.texto = err;
        return;
      }

      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      service.getNegociacoesSemanaAnterior( (err, negociacoes) => {
        if(err){
          this._mensagem.texto = err;
          return;
        }
  
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        service.getNegociacoesSemanaRetrasada( (err, negociacoes) => {
          if(err){
            this._mensagem.texto = err;
            return;
          }
    
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
          this._mensagem.texto = 'Negociacções importadas com sucesso';
        });
      });
    });

    */

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