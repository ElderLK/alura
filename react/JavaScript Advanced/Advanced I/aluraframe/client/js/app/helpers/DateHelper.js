class DateHelper {

  static dataParaTexto(data) {
    return data.getDate()
          + '/' + (data.getMonth() +1)
          + '/' + data.getFullYear();
  }

  static textoParaData(texto) {
    return new Date(
      ...texto
      .split('-')
      .map((item, index) => item - (index % 2)));
  }

}