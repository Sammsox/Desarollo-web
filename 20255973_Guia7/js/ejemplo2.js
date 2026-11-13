// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const buttonRecorrer = document.forms["frmRegistro"].elements["btnRecorrer"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");
const tituloModal = document.getElementById("modalLabel");

// Recorrer el formulario
const recorrerFormulario = function () {
  let totText = 0;
  let totRadio = 0;
  let totCheck = 0;
  let totDate = 0;
  let totSelect = 0;
  let totFile = 0;
  let totPass = 0;
  let totEmail = 0;

  // Recorriendo elementos del formulario
  let elementos = formulario.elements;
  let totalElementos = elementos.length;

  for (let index = 0; index < totalElementos; index++) {
    // Accediendo a cada hijo del formulario
    let elemento = elementos[index];

    // verificando el tipo de control en el formulario
    let tipoElemento = elemento.type;
    // verificando el tipo de nodo
    let tipoNode = elemento.nodeName;

    // Contabilizando el total de INPUT TYPE = TEXT
    if (tipoElemento == "text" && tipoNode == "INPUT") {
      console.log(elemento);
      totText++;
    }
    // Contabilizando el total de INPUT TYPE = PASSWORD
    else if (tipoElemento == "password" && tipoNode == "INPUT") {
      console.log(elemento);
      totPass++;
    }
    // Contabilizando el total de INPUT TYPE = EMAIL
    else if (tipoElemento == "email" && tipoNode == "INPUT") {
      console.log(elemento);
      totEmail++;
    }
    // Contabilizando el total de INPUT TYPE = RADIO
    else if (tipoElemento == "radio" && tipoNode == "INPUT") {
      console.log(elemento);
      totRadio++;
    }
    // Contabilizando el total de INPUT TYPE = CHECKBOX
    else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
      console.log(elemento);
      totCheck++;
    }
    // Contabilizando el total de INPUT TYPE = FILE
    else if (tipoElemento == "file" && tipoNode == "INPUT") {
      console.log(elemento);
      totFile++;
    }
    // Contabilizando el total de INPUT TYPE = DATE
    else if (tipoElemento == "date" && tipoNode == "INPUT") {
      console.log(elemento);
      totDate++;
    }
    // Contabilizando el total de SELECT
    else if (tipoNode == "SELECT") {
      console.log(elemento);
      totSelect++;
    }
  }

  let resultado = `
    Total de input[type="text"] = ${totText}<br>
    Total de input[type="password"] = ${totPass}<br>
    Total de input[type="radio"] = ${totRadio}<br>
    Total de input[type="checkbox"] = ${totCheck}<br>
    Total de input[type="date"] = ${totDate}<br>
    Total de input[type="email"] = ${totEmail}<br>
    Total de select = ${totSelect}<br>
  `;

  tituloModal.textContent = "Elementos del formulario";
  bodyModal.innerHTML = resultado;
  //Funcion que permite mostrar el modal de Bootstrap
  //Esta funcion es definida por Bootstrap
  modal.show();
};

// ==========================================================
// EJERCICIO COMPLEMENTARIO 1: VALIDACION DEL FORMULARIO
// (sin innerHTML, solo funciones del DOM)
// ==========================================================

// Referencias a los controles del formulario
const txtNombre = document.getElementById("idNombre");
const txtApellidos = document.getElementById("idApellidos");
const txtFechaNac = document.getElementById("idFechaNac");
const txtCorreo = document.getElementById("idCorreo");
const txtPassword = document.getElementById("idPassword");
const txtPasswordRepetir = document.getElementById("idPasswordRepetir");
const cmbPais = document.getElementById("idCmPais");
const fileAvatar = document.getElementById("idArchivo");
const checkIntereses = formulario.querySelectorAll('input[type="checkbox"]');
const radioCarreras = formulario.querySelectorAll('input[name="idRdCarrera"]');

// Expresion regular para validar el correo electronico
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Obtiene el texto del label asociado a un control
const textoLabel = function (control) {
  return document.querySelector(`label[for="${control.id}"]`).textContent.trim();
};

// Fecha actual en formato yyyy-mm-dd (hora local)
const fechaActual = function () {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
};

// Evitando que el calendario permita fechas futuras
txtFechaNac.setAttribute("max", fechaActual());

// Elimina todos los hijos de un nodo
const limpiarNodo = function (nodo) {
  while (nodo.firstChild) {
    nodo.removeChild(nodo.firstChild);
  }
};

const marcarError = function (control) {
  control.classList.add("is-invalid");
};

const validarFormulario = function () {
  let errores = [];

  // Quitando las marcas de error anteriores
  formulario.querySelectorAll(".is-invalid").forEach((control) => {
    control.classList.remove("is-invalid");
  });

  // a. Validando que los campos no esten vacios
  const camposTexto = [
    txtNombre,
    txtApellidos,
    txtFechaNac,
    txtCorreo,
    txtPassword,
    txtPasswordRepetir,
  ];
  for (const campo of camposTexto) {
    if (campo.value.trim() == "") {
      errores.push(`El campo "${textoLabel(campo)}" es obligatorio`);
      marcarError(campo);
    }
  }
  if (fileAvatar.files.length == 0) {
    errores.push("Debe seleccionar la imagen de su avatar");
    marcarError(fileAvatar);
  }

  // b. Validando que la fecha de nacimiento no supere la fecha actual
  if (txtFechaNac.value != "" && txtFechaNac.value > fechaActual()) {
    errores.push("La fecha de nacimiento no puede ser mayor a la fecha actual");
    marcarError(txtFechaNac);
  }

  // c. Validando el correo con expresion regular
  if (txtCorreo.value.trim() != "" && !regexCorreo.test(txtCorreo.value.trim())) {
    errores.push("El correo electrónico no tiene un formato válido");
    marcarError(txtCorreo);
  }

  // d. Validando que las contraseñas sean iguales
  if (
    txtPassword.value != "" &&
    txtPasswordRepetir.value != "" &&
    txtPassword.value != txtPasswordRepetir.value
  ) {
    errores.push("Las contraseñas no coinciden");
    marcarError(txtPassword);
    marcarError(txtPasswordRepetir);
  }

  // e. Al menos un interes seleccionado
  const intereses = [];
  checkIntereses.forEach((check) => {
    if (check.checked) intereses.push(textoLabel(check));
  });
  if (intereses.length == 0) {
    errores.push("Debe seleccionar al menos un interés");
    checkIntereses.forEach(marcarError);
  }

  // f. Carrera seleccionada
  let carrera = "";
  radioCarreras.forEach((radio) => {
    if (radio.checked) carrera = textoLabel(radio);
  });
  if (carrera == "") {
    errores.push("Debe seleccionar una carrera");
    radioCarreras.forEach(marcarError);
  }

  // g. Pais de origen seleccionado (la primera opcion es el texto de ayuda)
  if (cmbPais.selectedIndex == 0) {
    errores.push("Debe seleccionar un país de origen");
    marcarError(cmbPais);
  }

  if (errores.length > 0) {
    mostrarErrores(errores);
  } else {
    mostrarTabla([
      ["Nombres", txtNombre.value.trim()],
      ["Apellidos", txtApellidos.value.trim()],
      ["Fecha de nacimiento", txtFechaNac.value],
      ["Correo electrónico", txtCorreo.value.trim()],
      ["Intereses", intereses.join(", ")],
      ["Carrera", carrera],
      ["País de origen", cmbPais.options[cmbPais.selectedIndex].text],
      ["Avatar", fileAvatar.files[0]],
    ]);
  }
};

// Muestra la lista de errores dentro del modal
const mostrarErrores = function (errores) {
  limpiarNodo(bodyModal);
  tituloModal.textContent = "Revise la información del formulario";

  const alerta = document.createElement("div");
  alerta.setAttribute("class", "alert alert-danger mb-0");

  const lista = document.createElement("ul");
  lista.setAttribute("class", "mb-0");
  for (const error of errores) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(error));
    lista.appendChild(item);
  }

  alerta.appendChild(lista);
  bodyModal.appendChild(alerta);
  modal.show();
};

// Crea una tabla con la informacion capturada usando funciones del DOM
const mostrarTabla = function (datos) {
  limpiarNodo(bodyModal);
  tituloModal.textContent = "Registro completado";

  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-striped table-bordered align-middle mb-0");

  // Encabezado de la tabla
  const thead = document.createElement("thead");
  thead.setAttribute("class", "table-dark");
  const filaEncabezado = document.createElement("tr");
  for (const texto of ["Campo", "Valor"]) {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(texto));
    filaEncabezado.appendChild(th);
  }
  thead.appendChild(filaEncabezado);
  tabla.appendChild(thead);

  // Cuerpo de la tabla
  const tbody = document.createElement("tbody");
  for (const [campo, valor] of datos) {
    const fila = document.createElement("tr");

    const celdaCampo = document.createElement("th");
    celdaCampo.setAttribute("scope", "row");
    celdaCampo.appendChild(document.createTextNode(campo));

    const celdaValor = document.createElement("td");
    if (valor instanceof File) {
      // Vista previa de la imagen del avatar
      const imagen = document.createElement("img");
      imagen.setAttribute("src", URL.createObjectURL(valor));
      imagen.setAttribute("alt", valor.name);
      imagen.setAttribute("class", "rounded me-2");
      imagen.setAttribute("style", "width:48px; height:48px; object-fit:cover;");
      celdaValor.appendChild(imagen);
      celdaValor.appendChild(document.createTextNode(valor.name));
    } else {
      celdaValor.appendChild(document.createTextNode(valor));
    }

    fila.appendChild(celdaCampo);
    fila.appendChild(celdaValor);
    tbody.appendChild(fila);
  }
  tabla.appendChild(tbody);

  bodyModal.appendChild(tabla);
  modal.show();
};

// Quitando la marca de error cuando el usuario corrige un campo
formulario.addEventListener("input", (event) => {
  event.target.classList.remove("is-invalid");
  if (event.target.type == "radio" || event.target.type == "checkbox") {
    formulario
      .querySelectorAll(`input[type="${event.target.type}"]`)
      .forEach((control) => control.classList.remove("is-invalid"));
  }
});

// agregando eventos al boton
buttonRecorrer.onclick = () => {
  recorrerFormulario();
};

button.onclick = () => {
  validarFormulario();
};
