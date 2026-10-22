"use strict";

// Las actividades TODO están señaladas con numeración para completarlas en clase.
// No se utiliza onclick en HTML: todos los eventos se registran en JavaScript.

// ============================================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================================
const formulario = document.querySelector("#formInscripcion");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const contadorNombre = document.querySelector("#contadorNombre");
const comentarios = document.querySelector("#comentarios");
const contadorComentarios = document.querySelector("#contadorComentarios");
const taller = document.querySelector("#taller");
const total = document.querySelector("#total");
const resumenModalidad = document.querySelector("#resumenModalidad");
const resumenTaller = document.querySelector("#resumenTaller");
const mensajeResultado = document.querySelector("#mensajeResultado");
const opcionesModalidad = document.querySelectorAll('input[name="modalidad"]');

const PRECIO_PRESENCIAL = 15;
const PRECIO_TALLER = 10;

// ============================================================
// 2. EVENTO input — EJEMPLO RESUELTO
// ============================================================
// El evento input ocurre conforme cambia el valor de un campo.
nombre.addEventListener("input", function () {
  contadorNombre.textContent = `${nombre.value.length}/60`;
});

// ACTIVIDAD 1 (input): actualiza contadorComentarios conforme el
// usuario escribe en el textarea. Formato esperado: "12/200".
// Pista: comentarios.value.length, contadorComentarios.textContent.
// TODO 1: registra un listener para "input" en comentarios.
comentarios.addEventListener("input", function () {
  contadorComentarios.textContent = `${comentarios.value.length}/200`;
});
// ============================================================
// 3. EVENTO change — EJEMPLO RESUELTO
// ============================================================
function obtenerModalidad() {
  return document.querySelector('input[name="modalidad"]:checked').value;
}

function calcularTotal() {
  let precio = obtenerModalidad() === "presencial" ? PRECIO_PRESENCIAL : 0;
  if (taller.checked) precio += PRECIO_TALLER;
  return precio;
}

function actualizarResumen() {
  resumenModalidad.textContent = obtenerModalidad() === "presencial" ? "Presencial" : "Virtual";
  resumenTaller.textContent = taller.checked ? "Sí" : "No";
  total.textContent = `$${calcularTotal().toFixed(2)}`;
}

// Al seleccionar otra modalidad, se actualiza el resumen.
opcionesModalidad.forEach(function (opcion) {
  opcion.addEventListener("change", actualizarResumen);
});

// ACTIVIDAD 2 (change): al marcar o desmarcar el taller,
// el resumen y el precio también deben actualizarse.
// TODO 2: agrega un addEventListener al checkbox taller.
taller.addEventListener("change", actualizarResumen);


// ============================================================
// 4. EVENTOS focus Y blur — EJEMPLO + ACTIVIDAD
// ============================================================
// Ejemplo: cuando el campo obtiene foco, se destaca la ayuda.
nombre.addEventListener("focus", function () {
  document.querySelector("#ayudaNombre").classList.add("text-primary", "fw-semibold");
});

// ACTIVIDAD 3 (blur): al perder el foco, la ayuda debe regresar
// a su aspecto original. Quita las clases añadidas arriba.
// TODO 3: listener para "blur" en nombre con classList.remove(...).
nombre.addEventListener("blur", function () {
  document.querySelector("#ayudaNombre").classList.remove("text-primary", "fw-semibold");
});
// ============================================================
// 5. VALIDACIONES CON FUNCIONES REUTILIZABLES
// ============================================================
function validarNombre() {
  const esValido = nombre.value.trim().length >= 3;
  nombre.classList.toggle("is-invalid", !esValido);
  nombre.classList.toggle("is-valid", esValido);
  return esValido;
}

function validarCorreo() {
  const valor = correo.value.trim();
  const esValido = correo.validity.valid && valor !== "";
  correo.classList.toggle("is-invalid", !esValido);
  correo.classList.toggle("is-valid", esValido);
  return esValido;
}

// ACTIVIDAD 4 (blur): validar el nombre y el correo cuando
// cada campo pierde el foco, sin esperar al envío del formulario.
// TODO 4: listeners "blur" que llamen validarNombre / validarCorreo.
function validarNombreBlur() {
  validarNombre();
}
function validarCorreoBlur() {
  validarCorreo();
}
nombre.addEventListener("blur", validarNombreBlur);
correo.addEventListener("blur", validarCorreoBlur);
// ============================================================
// 6. EVENTO submit — EJEMPLO GUIADO + ACTIVIDAD FINAL
// ============================================================
formulario.addEventListener("submit", function (evento) {
  // Evita que el navegador recargue la página al enviar el formulario.
  evento.preventDefault();

  // Ejecutar ambas validaciones siempre, para señalar ambos errores.
  const nombreValido = validarNombre();
  const correoValido = validarCorreo();

  if (!nombreValido || !correoValido) {
    mensajeResultado.innerHTML = '<div class="alert alert-danger" role="alert">Revisa los campos marcados antes de continuar.</div>';
    return;
  }

  // ACTIVIDAD 5 (submit): mostrar una confirmación con:
  // - nombre (usar nombre.value.trim())
  // - modalidad (obtenerModalidad())
  // - total en dólares (calcularTotal().toFixed(2))
  // IMPORTANTE: no insertar datos escritos por el usuario mediante
  // innerHTML. Usa createElement y textContent para mostrarlos.
  // TODO 5: reemplaza este mensaje por el resumen de confirmación.
  mensajeResultado.textContent = "TODO 5: generar la confirmación de inscripción.";
});

// ============================================================
// 7. INICIALIZACIÓN
// ============================================================
// El atributo defer en index.html permite acceder al DOM aquí.
actualizarResumen();
