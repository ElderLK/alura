class MensagemView extends View{
  constructor(elemento){
    super(elemento);
  }
  template(model) {
    console.log(JSON.stringify(model.texto));
    return model.texto ? `<p class='alert alert-info'>${model.texto}</p>`
    : '<p></p>';
  }
}