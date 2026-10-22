//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Creamos una constante que permite identificar el maximo de intentos
const numeroIntentos = 3;
// Guardara el numero de intentos que realiza el usuario
let intentos = 1;
// Indica si el usuario ya adivino el numero
let adivinado = false;

function generarNumeroAleatorio() {
  //Definimos una variable para impresion de mensajes
  let mensaje;
  // Utilizamos el dom para acceder al parrafo creado
  const parrafo = document.querySelector("#idParrafo");

  if (adivinado) {
    mensaje = `Ya adivinaste el numero oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
  } else if (intentos <= numeroIntentos) {
    let numero = parseInt(
      prompt("¿Que número se ha generado (Intento " + intentos + ")?")
    );

    //verificamos el numero aleatorio con el ingresado por el usuario
    if (numero == numeroAleatorio) {
      adivinado = true;
      mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio}).
        Refresque la página para volver a jugar.`;
    } else if (intentos == numeroIntentos) {
      mensaje = `Su numero de intentos ha terminado.
          El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    } else {
      // Pista: le indicamos si el numero oculto es mas alto o mas bajo
      let pista;
      if (isNaN(numero)) {
        pista = "No ingresaste un número válido.";
      } else if (numeroAleatorio > numero) {
        pista = `El número que buscas es MÁS ALTO que ${numero}.`;
      } else {
        pista = `El número que buscas es MÁS BAJO que ${numero}.`;
      }
      mensaje = `${pista} Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos`;
    }

    //aumentamos el valor de los intentos
    intentos++;
  } else {
    mensaje = `Su numero de intentos ha terminado.
      El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
  }

  parrafo.innerHTML = mensaje;
}
