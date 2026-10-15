"use strict";
// Node 18+; no requiere instalar Jest ni dependencias.
// Ejecutar: node --test funciones.test.js
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  calcularPromedio,
  crearProducto,
  crearContador,
  listarDisponibles,
  resumirPedido
} = require("./funciones.js");

test("Ejercicio 1: promedio, mínimo y lista vacía", () => {
  assert.equal(calcularPromedio(6, 4, 6, 8), 6);
  assert.equal(calcularPromedio(7, 2, 4), 7);
  assert.equal(calcularPromedio(7), 7);
  assert.equal(calcularPromedio(0, 9, 10), 9.5);
  assert.equal(calcularPromedio(), 0);
});

test("Ejercicio 3: construir producto y cantidad por defecto", () => {
  assert.deepEqual(crearProducto("Libro", 12, 3), {
    nombre: "Libro", precio: 12, cantidad: 3, subtotal: 36
  });
  assert.deepEqual(crearProducto("Lápiz", 2), {
    nombre: "Lápiz", precio: 2, cantidad: 1, subtotal: 2
  });
});

test("Ejercicio 4: closure y estados independientes", () => {
  const a = crearContador(10);
  const b = crearContador();
  assert.equal(a.consultar(), 10);
  assert.equal(a.incrementar(), 11);
  assert.equal(a.decrementar(), 10);
  assert.equal(b.incrementar(), 1);
  assert.equal(a.consultar(), 10);
  assert.equal(b.consultar(), 1);
});

test("Ejercicio 5: filter + map sin modificar entrada", () => {
  const productos = [
    { nombre: "Mouse", precio: 15, stock: 2 },
    { nombre: "Monitor", precio: 150, stock: 3 },
    { nombre: "Cable", precio: 5, stock: 0 },
    { nombre: "Teclado", precio: 50, stock: 1 }
  ];
  const copia = structuredClone(productos);
  assert.deepEqual(listarDisponibles(productos, 50), ["MOUSE", "TECLADO"]);
  assert.deepEqual(listarDisponibles(productos, 10), []);
  assert.deepEqual(productos, copia);
});

test("Ejercicio 6: resumen combinado y categoría ausente", () => {
  const productos = [
    { nombre: "Laptop", precio: 100, stock: 2, categoria: "tech" },
    { nombre: "Mouse", precio: 20, stock: 0, categoria: "tech" },
    { nombre: "Libro", precio: 10, stock: 3, categoria: "libros" },
    { nombre: "Teclado", precio: 50, stock: 1, categoria: "tech" }
  ];
  const copia = structuredClone(productos);
  assert.deepEqual(resumirPedido(productos, "tech"), {
    nombres: ["Laptop", "Teclado"], total: 250,
    hayAgotados: true, todosConPrecioValido: true, primerIndice: 0
  });
  assert.deepEqual(resumirPedido(productos, "hogar"), {
    nombres: [], total: 0, hayAgotados: false,
    todosConPrecioValido: true, primerIndice: -1
  });
  assert.deepEqual(productos, copia);
});
