import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';


class NegociacaoController {

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

    this._service = new NegociacaoService();

    this._init();
  }

  _init() {
    this._service.lista()
    .then(negociacoes => this._listaNegociacoes.adiciona(negociacoes))
    .catch( error => {
      console.log(error);
      this._mensagem.texto = error;
    });

    setInterval(() => {
      this.importarNegociacoes()
    }, 3000);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();

    this._service.cadastra(negociacao)
        .then(mensagem => {
          console.log(this);
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem; 
            this._limpaFormulario();  
        }).catch(erro => this._mensagem.texto = erro);
  }

  apaga() {
      this._service.apaga()
      .then(msg => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = msg;
      })
      .catch(error => {
        this._mensagem.texto = error;
      });
  }

  importarNegociacoes() {
    this._service.importa(this._listaNegociacoes.negociacoes)
    .then((negociacoes) =>  {
      negociacoes.forEach(negociacao => (this._listaNegociacoes.adiciona(negociacao)));
      this._mensagem.texto = 'Negociações da semana importadas com sucesso';
    }).catch((error) => {
      this._mensagem.texto = error;
    });

  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
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
      parseInt(this._inputQuatidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuatidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }


}

let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;

}