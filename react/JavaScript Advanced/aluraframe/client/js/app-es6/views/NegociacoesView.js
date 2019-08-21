import { View } from "./View";
import { DateHelper } from "../helpers/DateHelper";
import { currentInstance } from '../controllers/NegociacaoController';

export class NegociacoesView extends View {

  constructor(elemento){
    super(elemento);

    elemento.addEventListener('click', function(event) {
      if(event.target.nodeName == 'TH'){
        currentInstance().ordena(event.target.textContent.toLowerCase());
      }
    })
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${ model.negociacoes.map((n) =>`
                <tr>
                    <td>${DateHelper.dataParaTexto(n.data)}</td>
                    <td>${n.quantidade}</td>
                    <td>${n.valor}</td>
                    <td>${parseFloat(n.volume).toFixed(2)}</td>
                </tr>

            `).join('')}
        </tbody>
        <tfoot>
          <td colspan="3"></td>
          <td>
              ${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
          </td>
        </tfoot>
      </table>`; 
  }

  // (function() {
  //   let total = 0;
  //   model.negociacoes.forEach(n => total+=n.volume);
  //   return total;
  // })()

}
