import { currentInstance } from './controllers/NegociacaoController'
// import {} from './polyfill/fetch'


let negociacaoController = new currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#importa').onclick = negociacaoController.importarNegociacoes.bind(negociacaoController);
document.querySelector('#apaga').onclick = negociacaoController.apaga.bind(negociacaoController);