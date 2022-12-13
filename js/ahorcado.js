
var palabras = [["pacifico", "Un océano"], ["ordenador", "Una máquina"], ["canada", "País"], 
                ["cine", "Se proyectan las peliculas"], ["rueda", "Es un invento en forma de circulo"], ["manzana", "Una fruta"], ["futbol", "Juego deportivo"], 
                ["murallachina", "Una de las 5 maravillas del mundo"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], 
                ["leon", "Un animal de la selva"], ["nigeria", "Un país africano"], ["uruguay", "Un país latinoamericano"], ["ilustracion", "Representación gráfica"], 
                ["campamento", "Actividad que se puede hacer en el bosque"]];
/*cual es la palabra*/
var palabra = "";
/*Para ponerla aleatoriamente*/
var rand;
/*Para ocultar la palabra oculta*/
var oculta = [];
/*Se manda a llamar la palabra*/
var hueco = document.getElementById("palabra");
/* Cuenta los intentos*/
var cont = 4;
/*Botones de letras*/
var buttons = document.getElementsByClassName('letra');
/* Boton de reset*/
var btnInicio = document.getElementById("reset");
/*Se escoge la palabra al azar*/
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}
/*Contador para pintar los guiones de la palabra*/
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}
/*Se genera el abecedario*/
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}
/*Verifica el intento*/
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = " ";
    document.getElementById("acierto").className += " ";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = " ";
    document.getElementById("acierto").className += " ";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}
/*Da la pista*/
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}
/*ha finalizado*/
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "¡Ganaste!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "¡Perdiste!";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
}
/*Se reestablece el juego*/
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  /*contador para las oportunidades*/
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}
/*Para iniciar el juego*/
window.onload = inicio();