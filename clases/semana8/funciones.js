"use strict";

/**
 * DESARROLLO WEB I - CLASE 12: FUNCIONES
 * Ejecutar en Quokka.js o con: node funciones.js
 *
 * Los EJEMPLOS están resueltos. Los EJERCICIOS contienen TODO.
 * Reemplaza cada `throw new Error(...)` por tu solución.
 * Pruebas: node --test funciones.test.js
 *
 */

// ============================================================
// 1. FUNCIONES BÁSICAS: DECLARACIÓN, RETORNO Y ARGUMENTOS
// ============================================================

// Ejemplo 1: función sin retorno (devuelve undefined)
function mostrarSaludo(nombre) {
  console.log(`Hola, ${nombre}`);
}
const retornoSaludo = mostrarSaludo("Ana");
console.log("Retorno:", retornoSaludo); // undefined

// Ejemplo 2: función que retorna un resultado
function sumar(a, b) {
  return a + b;
}
console.log("Suma:", sumar(5, 3)); // 8

// Ejemplo 3: parámetro por defecto
function presentar(nombre = "Invitado") {
  return `Bienvenido, ${nombre}`;
}
console.log(presentar());
console.log(presentar("Luis"));

// Ejemplo 4: JS no tiene sobrecarga tradicional por firmas.
// Podemos manejar argumentos opcionales dentro de una función.
function nombreCompleto(nombre, apellido) {
  return apellido === undefined ? nombre : `${nombre} ${apellido}`;
}
console.log(nombreCompleto("María"));
console.log(nombreCompleto("María", "López"));

// Ejemplo 5: rest parameters (siempre al final)
function sumarVarios(...numeros) {
  let total = 0;
  for (const numero of numeros) total += numero;
  return total;
}
console.log("Suma variable:", sumarVarios(2, 4, 6)); 

// EJERCICIO 1 : parámetros por defecto y rest.
// implementar calcularPromedio(notaMinima = 0, ...notas)
// - Si no recibe notas, devuelve notaMinima.
// - En otro caso, calcula el promedio aritmético de las notas.
// - Devuelve el mayor entre el promedio y notaMinima.
// Ej.: calcularPromedio(6, 4, 6, 8) -> 6
//      calcularPromedio(7) -> 7
function calcularPromedio(notaMinima = 0, ...notas) {
  let cantidad = notas.length;
  let suma = 0, promedio = 0;
  if(cantidad == 0) return notaMinima;
  for(let nota of notas){
    suma += nota;
  }
  promedio = suma / cantidad;
  return Math.max(promedio, notaMinima);
}

console.log(calcularPromedio(6, 4, 6, 8));
console.log(calcularPromedio(7));

// ============================================================
// 2. SCOPE Y SCOPE CHAIN
// ============================================================

const etiqueta = "global";
function mostrarScopes() {
  const etiqueta = "función"; // sombreado de la global
  if (true) {
    const detalle = "bloque";
    console.log("Scope actual:", detalle, etiqueta);
  }
  // console.log(detalle); // ReferenceError: fuera del bloque
  return etiqueta;
}
console.log("Scope función:", mostrarScopes());
console.log("Scope global:", etiqueta);

// EJERCICIO 2 : predecir la salida ANTES de ejecutar.
// ¿Cuál variable `nivel` se lee en cada console.log?
const nivel = "global";
function investigarScope() {
  const nivel = "función";
  if (true) {
    const nivel = "bloque";
    console.log("A:", nivel);
  }
  console.log("B:", nivel);
}
investigarScope();
console.log("C:", nivel);

// ============================================================
// 3. TIPOS: DECLARADA, EXPRESADA Y FLECHA
// ============================================================

console.log("Hoisting:", doble(4)); // Función declarada usable antes
function doble(n) {
  return n * 2;
}

const triple = function (n) { // función expresada
  return n * 3;
};
const cuadrado = (n) => n * n; // arrow, retorno implícito
const crearAlumno = (nombre, carnet) => ({ nombre, carnet });
console.log(triple(4), cuadrado(4), crearAlumno("Ana", "A001"));
// Ojo: con `const`, no llamar `triple` ANTES de su inicialización.

// EJERCICIO 3: arrow function con retorno de objeto.
// Implementar crearProducto(nombre, precio, cantidad = 1).
// Retornar { nombre, precio, cantidad, subtotal }, donde
// subtotal = precio * cantidad. NO imprimir: retornar el objeto.
// Ej.: crearProducto("Libro", 12, 3)
//      -> { nombre: "Libro", precio: 12, cantidad: 3, subtotal: 36 }
const crearProducto = (nombre, precio, cantidad = 1) => {
  const subtotal = precio * cantidad;
  return { nombre, precio, cantidad, subtotal };
};

// ============================================================
// 4. FUNCIONES AVANZADAS: CLOSURES, ORDEN SUPERIOR, IIFE
// ============================================================

// Closure: recuerda `saldo` después de terminar crearBilletera.
function crearBilletera(saldoInicial = 0) {
  let saldo = saldoInicial;
  return {
    depositar(monto) {
      saldo += monto;
      return saldo;
    },
    consultar() {
      return saldo;
    }
  };
}
const billetera = crearBilletera(20);
console.log("Billetera:", billetera.depositar(5), billetera.consultar());

// Función de orden superior: recibe un callback.
function aplicarOperacion(a, b, operacion) {
  return operacion(a, b);
}
console.log("Callback:", aplicarOperacion(3, 4, (a, b) => a * b));

// Función de orden superior: devuelve otra función.
function crearMultiplicador(factor) {
  return (n) => n * factor;
}
const multiplicarPorTres = crearMultiplicador(3);
console.log("Función retornada:", multiplicarPorTres(5));

// IIFE: función invocada inmediatamente, con scope privado.
const configuracion = (() => {
  const versionPrivada = "1.0";
  return { obtenerVersion: () => versionPrivada };
})();
console.log("IIFE:", configuracion.obtenerVersion());

// EJERCICIO 4: closure.
// Implementar crearContador(inicio = 0), que devuelva un objeto:
// - incrementar(): suma 1 y devuelve el nuevo valor.
// - decrementar(): resta 1 y devuelve el nuevo valor.
// - consultar(): devuelve el valor actual sin modificarlo.
// Cada contador debe tener un estado independiente.
function crearContador(inicio = 0) {
  let contador = inicio;
  return {
    incrementar() {
      contador++;
      return contador;
    },
    decrementar() {
      contador--;
      return contador;
    },
    consultar() {
      return contador;
    }
  };
}

// ============================================================
// 5. PROGRAMACIÓN FUNCIONAL: INMUTABILIDAD, PUREZA, COMPOSICIÓN
// ============================================================

const originales = [1, 2, 3];
const extendidos = [...originales, 4]; // no modifica originales
console.log("Inmutabilidad:", originales, extendidos);

function sumarImpuesto(precio, tasa) { // pura: sin efectos secundarios
  return precio * (1 + tasa);
}
function aplicarDescuento(precio, descuento) {
  return precio * (1 - descuento);
}
console.log("Composición:", sumarImpuesto(aplicarDescuento(100, 0.1), 0.13));

// ============================================================
// 6. MAP, FILTER, ENCADENAMIENTO, REDUCE
// ============================================================

const inventario = [
  { nombre: "Laptop", precio: 800, stock: 2, categoria: "tech" },
  { nombre: "Mouse", precio: 20, stock: 0, categoria: "tech" },
  { nombre: "Libro", precio: 15, stock: 6, categoria: "libros" },
  { nombre: "Teclado", precio: 50, stock: 3, categoria: "tech" }
];

console.log("map:", inventario.map((p) => p.nombre));
console.log("filter:", inventario.filter((p) => p.stock > 0));
console.log("encadenar:", inventario
  .filter((p) => p.categoria === "tech" && p.stock > 0)
  .map((p) => p.nombre));
console.log("reduce:", inventario.reduce((total, p) => total + p.precio * p.stock, 0));

// EJERCICIO 5: métodos de arrays; sin for ni forEach.
// Implementar listarDisponibles(productos, precioMaximo).
// Retornar nombres, en MAYÚSCULAS, de productos que tengan
// stock > 0 y precio <= precioMaximo. Mantener el orden original.
// Usar filter() y map(). No modificar el arreglo recibido.
const listarDisponibles = (productos, precioMaximo) => {
  throw new Error("TODO ejercicio 5: listarDisponibles");
};

// ============================================================
// 7. SOME, EVERY, FIND Y FINDINDEX
// ============================================================

console.log("some:", inventario.some((p) => p.stock === 0));
console.log("every:", inventario.every((p) => p.precio > 0));
console.log("find:", inventario.find((p) => p.nombre === "Libro"));
console.log("findIndex:", inventario.findIndex((p) => p.nombre === "Mouse"));

// EJERCICIO 6: integración final.
// implementar resumirPedido(productos, categoria).
// Devolver un objeto con:
// - nombres: array de nombres de productos de esa categoría en stock
// - total: suma de precio * stock de esos productos
// - hayAgotados: true si ALGÚN producto de esa categoría tiene stock 0
// - todosConPrecioValido: true si TODOS los productos recibidos
//   tienen precio > 0
// - primerIndice: índice del PRIMER producto de esa categoría
//   en el array original, o -1 si no existe
// Usa filter, map, reduce, some, every y findIndex.
// No mutar el array original.
function resumirPedido(productos, categoria) {
  throw new Error("TODO ejercicio 6: resumirPedido");
}

// Exportaciones para que Node.js pueda ejecutar las pruebas.
module.exports = {
  calcularPromedio,
  crearProducto,
  crearContador,
  listarDisponibles,
  resumirPedido
};
