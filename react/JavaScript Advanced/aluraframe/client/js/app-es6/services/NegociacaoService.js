import { HttpService } from "./HttpService";
import { ConnectionFactory } from "./ConnectionFactory";
import { NegociacaoDao } from "../dao/NegociacaoDao";
import { Negociacao } from "../models/Negociacao";


export class NegociacaoService{

    constructor(){
      this._http = new HttpService();
    }

    getNegociacoesSemana(){
    
        return new Promise((resolve, reject) => {  
          this._http
          .get('negociacoes/semana')
          .then((response) => {
            console.log(response);
            resolve( response.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)) )
          })
          .catch((error)=>{
            console.log(error);
            reject('Não foi possivel obter as negociações da semana atual');
          })
        });

    }

    getNegociacoesSemanaAnterior(){

      return new Promise((resolve, reject) => {  
        this._http
        .get('negociacoes/anterior')
        .then((response) => {
          resolve( response.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)) )
        })
        .catch((error)=>{
          console.log(error);
          reject('Não foi possivel obter as negociações da semana anterior');
        })
      });
       
    }

    getNegociacoesSemanaRetrasada(){
      return new Promise((resolve, reject) => {  
        this._http
        .get('negociacoes/retrasada')
        .then((response) => {
          resolve( response.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)) )
        })
        .catch((error)=>{
          console.log(error);
          reject('Não foi possivel obter as negociações da semana retrasada');
        })
      });
    }

    cadastra(negociacao) {
      return ConnectionFactory
         .getConnection()
         .then(conexao => new NegociacaoDao(conexao))
         .then(dao => dao.adiciona(negociacao))
         .then(() => 'Negociação cadastrada com sucesso')
         .catch(erro => {
             console.log(erro);
             throw new Error("Não foi possível adicionar a negociação")
         });
    }

    lista() {

      return ConnectionFactory
        .getConnection()
        .then(connection => {
          return new NegociacaoDao(connection)
        })
        .then(dao => dao.listaTodos())
        .catch(erro => {
              console.log(erro);
              throw new Error("Não foi possível listar as negociações")
        });
    }

    apaga(){
      return ConnectionFactory
      .getConnection()
      .then((connection) => new NegociacaoDao(connection))
      .then(dao => dao.removeTodos())
      .then(() => 'Negociações apagadas com sucesso')
      .catch(erro => {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações")
       });
    }

    importa(listaNegociacoesAtual) {
      return Promise.all([
        this.getNegociacoesSemana(),
        this.getNegociacoesSemanaAnterior(),
        this.getNegociacoesSemanaRetrasada()
      ])
      .then((negociacoes) => {
        return negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .filter(negociacao => 
           !listaNegociacoesAtual.some(negociacaoExistente =>{
            return negociacao.isEquals(negociacaoExistente);
           })
        )
      })
      .catch(erro => {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações")
       });
    }


}