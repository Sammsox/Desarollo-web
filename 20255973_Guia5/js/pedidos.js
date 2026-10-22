// =====================================================
// DATOS
// =====================================================
// Arreglo que almacena todos los pedidos registrados
let pedidos = [];

// =====================================================
// ELEMENTOS DEL DOM
// =====================================================
const formPedido = document.querySelector("#idFormPedido");
const inputProducto = document.querySelector("#idProducto");
const inputPrecio = document.querySelector("#idPrecio");
const inputCantidad = document.querySelector("#idCantidad");
const inputPrecioMaximo = document.querySelector("#idPrecioMaximo");
const btnFiltrar = document.querySelector("#idBtnFiltrar");
const btnMostrarTodos = document.querySelector("#idBtnMostrarTodos");
const btnLimpiar = document.querySelector("#idBtnLimpiar");
const cuerpoTabla = document.querySelector("#idCuerpoTabla");
const estado = document.querySelector("#idEstado");
const totalUnidades = document.querySelector("#idTotalUnidades");
const montoTotal = document.querySelector("#idMontoTotal");

// =====================================================
// PROCESAMIENTO DE DATOS (no tocan el HTML)
// =====================================================

// Devuelve un objeto con los errores encontrados (vacio si todo es valido)
function validarPedido(producto, precio, cantidad) {
  const errores = {};
  if (producto.trim() === "") errores.producto = true;
  if (isNaN(precio) || precio <= 0) errores.precio = true;
  if (!Number.isInteger(cantidad) || cantidad <= 0) errores.cantidad = true;
  return errores;
}

// Crea el objeto pedido con la estructura solicitada
function crearPedido(producto, precio, cantidad) {
  return { producto: producto.trim(), precio: precio, cantidad: cantidad };
}

function calcularSubtotal(pedido) {
  return pedido.precio * pedido.cantidad;
}

// Filtra sin modificar el arreglo original (filter devuelve uno nuevo)
function filtrarPorPrecio(lista, precioMaximo) {
  return lista.filter((pedido) => pedido.precio <= precioMaximo);
}

function calcularTotalUnidades(lista) {
  return lista.reduce((total, pedido) => total + pedido.cantidad, 0);
}

function calcularMontoTotal(lista) {
  return lista.reduce((total, pedido) => total + calcularSubtotal(pedido), 0);
}

function formatearMoneda(valor) {
  return `$${valor.toFixed(2)}`;
}

// Evita que el texto ingresado se interprete como HTML
function escaparHTML(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// =====================================================
// ACTUALIZACION DEL HTML
// =====================================================

// Dibuja la tabla y los indicadores a partir de la lista recibida
function mostrarPedidos(lista) {
  if (lista.length === 0) {
    cuerpoTabla.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay pedidos para mostrar</td></tr>`;
  } else {
    cuerpoTabla.innerHTML = lista
      .map(
        (pedido) => `
        <tr>
          <td>${escaparHTML(pedido.producto)}</td>
          <td class="text-end">${formatearMoneda(pedido.precio)}</td>
          <td class="text-end">${pedido.cantidad}</td>
          <td class="text-end">${formatearMoneda(calcularSubtotal(pedido))}</td>
        </tr>`
      )
      .join("");
  }

  estado.textContent = `Mostrando ${lista.length} de ${pedidos.length} pedidos`;
  totalUnidades.textContent = calcularTotalUnidades(lista);
  montoTotal.textContent = formatearMoneda(calcularMontoTotal(lista));
}

// Marca en rojo los campos con error usando las clases de Bootstrap
function mostrarErrores(errores) {
  inputProducto.classList.toggle("is-invalid", !!errores.producto);
  inputPrecio.classList.toggle("is-invalid", !!errores.precio);
  inputCantidad.classList.toggle("is-invalid", !!errores.cantidad);
}

function limpiarFormulario() {
  formPedido.reset();
  mostrarErrores({});
  inputProducto.focus();
}

// =====================================================
// MANEJADORES DE EVENTOS
// =====================================================

function agregarPedido(evento) {
  // Evita que el formulario recargue la pagina
  evento.preventDefault();

  const producto = inputProducto.value;
  const precio = parseFloat(inputPrecio.value);
  const cantidad = Number(inputCantidad.value === "" ? NaN : inputCantidad.value);

  const errores = validarPedido(producto, precio, cantidad);
  mostrarErrores(errores);
  if (Object.keys(errores).length > 0) return;

  pedidos.push(crearPedido(producto, precio, cantidad));
  inputPrecioMaximo.classList.remove("is-invalid");
  mostrarPedidos(pedidos);
  limpiarFormulario();
}

function filtrarProductos() {
  const precioMaximo = parseFloat(inputPrecioMaximo.value);
  if (isNaN(precioMaximo) || precioMaximo < 0) {
    inputPrecioMaximo.classList.add("is-invalid");
    return;
  }
  inputPrecioMaximo.classList.remove("is-invalid");
  mostrarPedidos(filtrarPorPrecio(pedidos, precioMaximo));
}

function mostrarTodos() {
  inputPrecioMaximo.value = "";
  inputPrecioMaximo.classList.remove("is-invalid");
  mostrarPedidos(pedidos);
}

function limpiarPedidos() {
  pedidos = [];
  inputPrecioMaximo.value = "";
  mostrarPedidos(pedidos);
}

formPedido.addEventListener("submit", agregarPedido);
btnFiltrar.addEventListener("click", filtrarProductos);
btnMostrarTodos.addEventListener("click", mostrarTodos);
btnLimpiar.addEventListener("click", limpiarPedidos);

// Estado inicial de la tabla
mostrarPedidos(pedidos);
