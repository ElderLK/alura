class NegociacaoService{

    constructor(){
      this._http = new HttpService();
    }

    getNegociacoesSemana(){
    
        return new Promise((resolve, reject) => {  
          this._http
          .get('negociacoes/semana')
          .then((response) => {
            resolve( response.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)) )
          })
          .catch((error)=>{
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
          reject('Não foi possivel obter as negociações da semana retrasada');
        })
      });
    }
}