export default  {
    methods : {

    codificar : function (texto){
    const arrayTexto= texto.split("");
    let arrayCodificado = arrayTexto.map(function(letra){
    switch (letra) {
       case 'a': letra = 'u'
         break;
        case 'e': letra = 'o'
            break;
       case 'o': letra = 'e'
            break;
        case 'u': letra = 'a'
          break;
       case 'i': letra = 'i'
          break;
     }
     return letra;
});
    return arrayCodificado.join('').toUpperCase();
}
}
}