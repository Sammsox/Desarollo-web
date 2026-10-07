a/* ==========================================================
   FUNDAMENTOS DE JAVASCRIPT
   Desarrollo Web I
   Escuela Superior de Economia y Negocios
   ========================================================== */


/* ----------------------------------------------------------
   1. VARIABLES Y DECLARACIÓN
   ---------------------------------------------------------- */

// "let" permite reasignar el valor posteriormente.
let ciudad = "San Salvador";
ciudad = "Santa Ana";
console.log(ciudad);

// "const" no permite reasignación una vez definida.
const universidad = "ESEN";
console.log(universidad);

// "var" es la forma histórica de declaración. Su alcance es
// de función y no de bloque, lo cual puede generar errores
// difíciles de detectar. Por esta razón se prefiere "let" o
// "const" en código actual.
var version = "ES5";
console.log(version);


// Alcance de bloque: "let" y "const" solo existen dentro del
// bloque {} donde se declaran.
if (true) {
  let mensajeInterno = "Solo existe aquí dentro";
  console.log(mensajeInterno);
}
//console.log(mensajeInterno); // Produciría un error de referencia.


/* ----------------------------------------------------------
   2. TIPOS DE DATOS PRIMITIVOS Y typeof
   ---------------------------------------------------------- */

let unTexto = "Hola";
let unNumero = 42;
let unBooleano = true;
let sinDefinir;
let valorNulo = null;

console.log(typeof unTexto);      // "string"
console.log(typeof unNumero);     // "number"
console.log(typeof unBooleano);   // "boolean"
console.log(typeof sinDefinir);   // "undefined"
console.log(typeof valorNulo);    // "object" (particularidad histórica del lenguaje)


/* ----------------------------------------------------------
   3. OPERADORES ARITMÉTICOS, DE ASIGNACIÓN Y DE COMPARACIÓN
   ---------------------------------------------------------- */

// Aritméticos
console.log(5 + 3);   // Suma
console.log(5 - 3);   // Resta
console.log(5 * 3);   // Multiplicación
console.log(5 / 3);   // División
console.log(5 % 3);   // Módulo (residuo de la división)

// Asignación compuesta
let contador = 10;
contador += 5; // Equivale a contador = contador + 5
console.log(contador);

// Comparación: diferencia esencial entre == y ===
console.log(5 == "5");   // true. Compara solo el valor, convirtiendo tipos.
console.log(0==false)
console.log(0===false)
console.log(5 === "5");  // false. Compara valor y tipo, sin conversión.

// Recomendación general: usar siempre === y !== para evitar
// resultados inesperados por conversión automática de tipos.


/* ----------------------------------------------------------
   4. CONDICIONALES (if / else)
   ---------------------------------------------------------- */

let horaActual = 14;

if (horaActual < 12) {
  console.log("Buenos días");
} else if (horaActual < 19) {
  console.log("Buenas tardes");
} else {
  console.log("Buenas noches");
}


/* ----------------------------------------------------------
   5. OPERADOR TERNARIO
   ---------------------------------------------------------- */

// Alternativa concisa a if/else para asignaciones simples.
// Estructura: condición ? valorSiVerdadero : valorSiFalso
let edad = 15;
let categoria = edad >= 18 ? "Adulto" : "Menor de edad";
console.log(categoria);


/* ----------------------------------------------------------
   6. VALORES TRUTHY Y FALSY
   ---------------------------------------------------------- */

// Un if() no exige una comparación explícita: evalúa si el
// valor se comporta como verdadero o como falso.
// Existen exactamente seis valores falsy en JavaScript:
//   false, 0, "" (cadena vacía), null, undefined, NaN
// Cualquier otro valor se considera truthy, incluyendo
// cadenas no vacías, objetos vacíos {} y arreglos vacíos [].

if ("") {
  console.log("Esto no se ejecuta");
} else {
  console.log("Cadena vacía es falsy");
}

if ("0") {
  console.log("Cadena '0' es truthy"); // Se ejecuta: no es el número 0.
}

if ([]) {
  console.log("Arreglo vacío es truthy"); // Aunque parezca vacío, es un objeto.
}


/* ----------------------------------------------------------
   7. COERCIÓN DE TIPOS
   ---------------------------------------------------------- */

// JavaScript convierte tipos automáticamente en ciertas
// operaciones, con resultados que conviene anticipar.

console.log("5" + 3);      // "53". El "+" con una cadena concatena.
console.log("5" - 3);      // 2. El "-" fuerza conversión numérica.
console.log(true + 1);     // 2. "true" se convierte en 1.
console.log(false + 1);    // 1. "false" se convierte en 0.
console.log([] == false);  // true. El arreglo vacío se convierte en "" y luego en 0.
console.log("10" * "2");   // 20. Ambas cadenas se convierten en número.

// Estos casos son la razón principal por la que se recomienda
// usar === en lugar de ==: evita depender de estas conversiones.


/* ----------------------------------------------------------
   8. CONVERSIÓN EXPLÍCITA DE TIPOS Y NaN
   ---------------------------------------------------------- */

// Es preferible convertir explícitamente en lugar de depender
// de la coerción automática. Esto es indispensable al leer
// datos de formularios, ya que input.value siempre es cadena.

console.log(Number("25"));      // 25 (número)
console.log(String(25));        // "25" (cadena)
console.log(parseInt("25px"));  // 25. Extrae la parte numérica inicial.
console.log(parseFloat("3.14")); // 3.14

// NaN ("Not a Number") aparece cuando una conversión falla.
console.log(Number("veinte"));    // NaN
console.log(isNaN(Number("veinte"))); // true. isNaN() permite detectarlo.


/* ----------------------------------------------------------
   9. DIFERENCIA ENTRE null Y undefined
   ---------------------------------------------------------- */

// "undefined" significa que una variable existe pero no se le
// ha asignado ningún valor, o que no se le ha dado seguimiento.
let variableSinAsignar;
console.log(variableSinAsignar); // undefined

// "null" es un valor asignado deliberadamente para indicar
// ausencia intencional de valor.
let variableVacia = null;
console.log(variableVacia); // null

// Es una distinción relevante porque, más adelante,
// document.getElementById() retorna null cuando no encuentra
// el elemento buscado, y no undefined.


