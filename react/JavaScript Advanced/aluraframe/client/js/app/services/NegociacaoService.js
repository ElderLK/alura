class NegociacaoService{

    getNegociacoesSemana(){
        return new Promise((resolve, reject) => {  
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
        
            xhr.onreadystatechange = () => {
                /*
                    0: requisição ainda não iniciada.
                    1: conexão com o servidor estabelecida.
                    2: requisição recebida.
                    3: processando requisição.
                    4: requisição concluída e a resposta esta pronta.
                */
            if(xhr.readyState == 4){ // req concluida
                if (xhr.status == 200){
                resolve(JSON.parse(xhr.responseText)
                .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                
                } else {
                console.log(xhr.responseText);
                reject('Não foi possivel obter as negociações da semana');
                }
            }
        
            };
            xhr.send();   
        });
    }

    getNegociacoesSemanaAnterior(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');
        
            xhr.onreadystatechange = () => {
                /*
                    0: requisição ainda não iniciada.
                    1: conexão com o servidor estabelecida.
                    2: requisição recebida.
                    3: processando requisição.
                    4: requisição concluída e a resposta esta pronta.
                */
              if(xhr.readyState == 4){ // req concluida
                if (xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText)
                  .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                 
                } else {
                  console.log(xhr.responseText);
                  reject('Não foi possivel obter as negociações da semana anterior');
                }
              }
        
            };
            xhr.send();
        });
       
    }

    getNegociacoesSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');
        
            xhr.onreadystatechange = () => {
                /*
                    0: requisição ainda não iniciada.
                    1: conexão com o servidor estabelecida.
                    2: requisição recebida.
                    3: processando requisição.
                    4: requisição concluída e a resposta esta pronta.
                */
              if(xhr.readyState == 4){ // req concluida
                if (xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText)
                  .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                 
                } else {
                  console.log(xhr.responseText);
                  reject('Não foi possivel obter as negociações da semana retrasada');
                }
              }
        
            };
            xhr.send();
        });
    }
}