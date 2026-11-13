// ==========================================================
// EJERCICIO COMPLEMENTARIO 2: CONSUMO DE API DE RAPIDAPI
// API: Movie Database Alternative (plan gratuito)
//  - Listado: GET /?s={busqueda}&page={n}&r=json
//  - Detalle: GET /?i={imdbID}&r=json&plot=full
// ==========================================================

const API_HOST = "movie-database-alternative.p.rapidapi.com";
const API_URL = `https://${API_HOST}/`;
const CLAVE_STORAGE = "guia7_rapidapi_key";

// Referencias a elementos HTML
const formKey = document.getElementById("idFormKey");
const txtApiKey = document.getElementById("idApiKey");
const formBuscar = document.getElementById("idFormBuscar");
const txtBuscar = document.getElementById("idBuscar");
const cmbTipo = document.getElementById("idTipo");
const buttonBuscar = document.getElementById("idBtnBuscar");
const estado = document.getElementById("idEstado");
const resultados = document.getElementById("idResultados");
const paginacion = document.getElementById("idPaginacion");
const buttonAnterior = document.getElementById("idBtnAnterior");
const buttonSiguiente = document.getElementById("idBtnSiguiente");
const textoPagina = document.getElementById("idTextoPagina");
const tituloDetalle = document.getElementById("idTituloDetalle");
const bodyDetalle = document.getElementById("idBodyDetalle");

// CREANDO MODAL CON BOOTSTRAP
const modalDetalle = new bootstrap.Modal(document.getElementById("idModalDetalle"), {});

// Estado de la busqueda actual
let busquedaActual = "";
let tipoActual = "";
let paginaActual = 1;
let totalPaginas = 1;

// ---------------------- Utilidades del DOM ----------------------

// Crea un elemento con clases y texto opcionales
const crear = function (etiqueta, clases = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clases) elemento.setAttribute("class", clases);
  if (texto) elemento.textContent = texto;
  return elemento;
};

const limpiarNodo = function (nodo) {
  while (nodo.firstChild) {
    nodo.removeChild(nodo.firstChild);
  }
};

// Muestra un mensaje de carga con spinner de bootstrap
const mostrarCargando = function (contenedor, mensaje) {
  limpiarNodo(contenedor);
  const div = crear("div", "d-flex align-items-center justify-content-center gap-2 my-4 text-primary");
  const spinner = crear("div", "spinner-border spinner-border-sm");
  spinner.setAttribute("role", "status");
  div.appendChild(spinner);
  div.appendChild(crear("span", "", mensaje));
  contenedor.appendChild(div);
};

// Muestra un mensaje de alerta (error / informacion)
const mostrarMensaje = function (contenedor, mensaje, tipo = "danger") {
  limpiarNodo(contenedor);
  const alerta = crear("div", `alert alert-${tipo} my-3`);
  alerta.setAttribute("role", "alert");
  const icono = crear("i", tipo == "danger" ? "bi bi-exclamation-triangle me-2" : "bi bi-info-circle me-2");
  alerta.appendChild(icono);
  alerta.appendChild(document.createTextNode(mensaje));
  contenedor.appendChild(alerta);
};

// Imagen del poster o un marcador cuando no existe
const crearPoster = function (url, titulo, clases) {
  if (url && url != "N/A") {
    const img = crear("img", clases);
    img.setAttribute("src", url);
    img.setAttribute("alt", `Poster de ${titulo}`);
    img.setAttribute("loading", "lazy");
    // Si la imagen no carga se reemplaza por el marcador
    img.addEventListener("error", () => img.replaceWith(crearPoster("", titulo, clases)));
    return img;
  }
  const marcador = crear("div", `${clases} bg-secondary-subtle d-flex align-items-center justify-content-center`);
  marcador.appendChild(crear("i", "bi bi-film fs-1 text-secondary"));
  return marcador;
};

// ---------------------- API Key ----------------------

const leerApiKey = function () {
  try {
    return localStorage.getItem(CLAVE_STORAGE) || "";
  } catch (error) {
    return txtApiKey.value.trim();
  }
};

const guardarApiKey = function (key) {
  try {
    localStorage.setItem(CLAVE_STORAGE, key);
  } catch (error) {
    console.warn("No se pudo guardar la key en localStorage", error);
  }
};

// ---------------------- Peticiones a la API ----------------------

// Funcion generica para consumir la API con async/await
const consultarApi = async function (parametros) {
  const apiKey = leerApiKey() || txtApiKey.value.trim();
  if (!apiKey) {
    throw new Error("Primero debe ingresar y guardar su API Key de RapidAPI.");
  }

  const url = `${API_URL}?${new URLSearchParams({ ...parametros, r: "json" })}`;

  let respuesta;
  try {
    respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": API_HOST,
      },
    });
  } catch (error) {
    throw new Error("No se pudo conectar con la API. Revise su conexión a internet.");
  }

  if (respuesta.status == 401 || respuesta.status == 403) {
    throw new Error("API Key inválida o no está suscrito a la API en RapidAPI.");
  }
  if (respuesta.status == 429) {
    throw new Error("Se alcanzó el límite de peticiones del plan gratuito. Intente más tarde.");
  }
  if (!respuesta.ok) {
    throw new Error(`Error en la petición (${respuesta.status} ${respuesta.statusText}).`);
  }

  const datos = await respuesta.json();
  // La API responde Response: "False" cuando no encuentra resultados
  if (datos.Response == "False") {
    throw new Error(datos.Error || "La API no devolvió resultados.");
  }
  return datos;
};

// Endpoint 1: listado de recursos
const buscarPeliculas = async function (pagina = 1) {
  paginaActual = pagina;
  mostrarCargando(estado, "Buscando películas...");
  limpiarNodo(resultados);
  paginacion.classList.add("d-none");
  buttonBuscar.disabled = true;

  try {
    const parametros = { s: busquedaActual, page: paginaActual };
    if (tipoActual) parametros.type = tipoActual;

    const datos = await consultarApi(parametros);
    const total = parseInt(datos.totalResults, 10) || datos.Search.length;
    totalPaginas = Math.ceil(total / 10);

    mostrarMensaje(estado, `Se encontraron ${total} resultados para "${busquedaActual}".`, "info");
    mostrarListado(datos.Search);
    actualizarPaginacion();
  } catch (error) {
    mostrarMensaje(estado, error.message);
  } finally {
    buttonBuscar.disabled = false;
  }
};

// Endpoint 2: detalle de un recurso
const verDetalle = async function (imdbID, titulo) {
  tituloDetalle.textContent = titulo;
  mostrarCargando(bodyDetalle, "Cargando detalle...");
  modalDetalle.show();

  try {
    const pelicula = await consultarApi({ i: imdbID, plot: "full" });
    mostrarDetalle(pelicula);
  } catch (error) {
    mostrarMensaje(bodyDetalle, error.message);
  }
};

// ---------------------- Renderizado ----------------------

const mostrarListado = function (peliculas) {
  limpiarNodo(resultados);

  for (const pelicula of peliculas) {
    const col = crear("div", "col");
    const card = crear("div", "card h-100 shadow-sm");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("title", "Ver detalle");

    card.appendChild(crearPoster(pelicula.Poster, pelicula.Title, "card-img-top poster"));

    const body = crear("div", "card-body");
    body.appendChild(crear("h2", "card-title fs-6 fw-bold", pelicula.Title));
    const info = crear("p", "card-text small text-body-secondary mb-0");
    info.appendChild(crear("span", "badge text-bg-dark me-1", pelicula.Type));
    info.appendChild(document.createTextNode(pelicula.Year));
    body.appendChild(info);
    card.appendChild(body);

    // Seleccionar un elemento consulta su detalle sin recargar la pagina
    card.addEventListener("click", () => verDetalle(pelicula.imdbID, pelicula.Title));
    card.addEventListener("keydown", (event) => {
      if (event.key == "Enter") verDetalle(pelicula.imdbID, pelicula.Title);
    });

    col.appendChild(card);
    resultados.appendChild(col);
  }
};

const mostrarDetalle = function (pelicula) {
  limpiarNodo(bodyDetalle);

  const fila = crear("div", "row g-3");
  const colPoster = crear("div", "col-md-4");
  colPoster.appendChild(crearPoster(pelicula.Poster, pelicula.Title, "img-fluid rounded w-100 poster"));

  const colInfo = crear("div", "col-md-8");
  colInfo.appendChild(crear("h2", "fs-4 fw-bold", `${pelicula.Title} (${pelicula.Year})`));

  if (pelicula.imdbRating && pelicula.imdbRating != "N/A") {
    const rating = crear("p", "fs-5 mb-2");
    rating.appendChild(crear("i", "bi bi-star-fill text-warning me-1"));
    rating.appendChild(document.createTextNode(`${pelicula.imdbRating} / 10`));
    rating.appendChild(crear("span", "small text-body-secondary ms-2", `(${pelicula.imdbVotes} votos)`));
    colInfo.appendChild(rating);
  }

  if (pelicula.Plot && pelicula.Plot != "N/A") {
    colInfo.appendChild(crear("p", "", pelicula.Plot));
  }

  // Tabla con informacion adicional
  const campos = [
    ["Género", pelicula.Genre],
    ["Duración", pelicula.Runtime],
    ["Estreno", pelicula.Released],
    ["Director", pelicula.Director],
    ["Actores", pelicula.Actors],
    ["Idioma", pelicula.Language],
    ["País", pelicula.Country],
    ["Premios", pelicula.Awards],
    ["Temporadas", pelicula.totalSeasons],
  ];
  const tabla = crear("table", "table table-sm mb-0");
  const tbody = crear("tbody");
  for (const [campo, valor] of campos) {
    if (!valor || valor == "N/A") continue;
    const tr = crear("tr");
    tr.appendChild(crear("th", "text-nowrap", campo));
    tr.appendChild(crear("td", "", valor));
    tbody.appendChild(tr);
  }
  tabla.appendChild(tbody);
  colInfo.appendChild(tabla);

  fila.appendChild(colPoster);
  fila.appendChild(colInfo);
  bodyDetalle.appendChild(fila);
};

const actualizarPaginacion = function () {
  if (totalPaginas <= 1) {
    paginacion.classList.add("d-none");
    return;
  }
  paginacion.classList.remove("d-none");
  textoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  buttonAnterior.disabled = paginaActual <= 1;
  buttonSiguiente.disabled = paginaActual >= totalPaginas;
};

// ---------------------- Eventos ----------------------

formKey.addEventListener("submit", (event) => {
  event.preventDefault();
  const key = txtApiKey.value.trim();
  if (key == "") {
    mostrarMensaje(estado, "Ingrese una API Key válida.");
    return;
  }
  guardarApiKey(key);
  mostrarMensaje(estado, "API Key guardada. Ya puede realizar búsquedas.", "success");
});

formBuscar.addEventListener("submit", (event) => {
  event.preventDefault();
  const texto = txtBuscar.value.trim();
  if (texto.length < 3) {
    mostrarMensaje(estado, "Escriba al menos 3 caracteres para buscar.", "warning");
    return;
  }
  busquedaActual = texto;
  tipoActual = cmbTipo.value;
  buscarPeliculas(1);
});

buttonAnterior.addEventListener("click", () => buscarPeliculas(paginaActual - 1));
buttonSiguiente.addEventListener("click", () => buscarPeliculas(paginaActual + 1));

// ---------------------- Inicio ----------------------
txtApiKey.value = leerApiKey();
if (txtApiKey.value) {
  busquedaActual = txtBuscar.value.trim();
  buscarPeliculas(1);
} else {
  mostrarMensaje(
    estado,
    "Para usar la aplicación suscríbase (gratis) a 'Movie Database Alternative' en RapidAPI y guarde su API Key arriba.",
    "info"
  );
}
