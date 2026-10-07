"use strict";

// 1. CADENAS DE CARACTERES 

// 1.1. Creación e inmutabilidad
{
  console.log("\n1.1. Creación e inmutabilidad");
  const nombre1 = 'Ana';
  const nombre2 = "Ana";
  const nombre3 = `Ana`;
  console.log(nombre1, nombre2, nombre3); 

  let saludo = "Hola";
  const original = saludo;
  saludo = saludo + " mundo";
  console.log(saludo);   
  console.log(original); 
  // Se reasignó saludo; la cadena original no se modificó.
}

// 1.2. Longitud y acceso mediante [], charAt() y at()
{
  console.log("\n1.2. Longitud y acceso");
  const palabra = "JavaScript";
  console.log(palabra.length);     
  console.log(palabra[0]);         
  console.log(palabra[9]);         
  console.log(palabra[10]);        
  console.log(palabra.charAt(0));  
  console.log(palabra.charAt(10)); 
  console.log(palabra.at(-1));     
  console.log(palabra.at(-2));     
  console.log(palabra.at(10));     
  // Los índices comienzan en 0. length es una propiedad, no un método.
  // Técnicamente, length cuenta unidades UTF-16; algunos caracteres
  // requieren más de una unidad. En esta palabra, cada letra ocupa una.
}

// 1.3. Concatenación
{
  console.log("\n1.3. Concatenación");
  const nombre = "Ana";
  const apellido = "López";
  const nombreCompleto = nombre + " " + apellido;
  console.log(nombreCompleto); 
}

// EJERCICIO 01. Longitud, acceso y concatenación
{
  const codigo = "WEB2026";
  // 1. Muestre la longitud, el primer carácter y el último carácter.
  // 2. Obtenga el último carácter usando tanto [] como at().
  // 3. Construya con + la cadena "Curso: WEB2026".
  // Resultados esperados: 7, "W", "6", "6" y "Curso: WEB2026".
  // Desarrollo:
}

// 1.4. Mayúsculas, minúsculas y espacios en los extremos
{
  console.log("\n1.4. Transformación y espacios");
  const texto = "  Hola Mundo  ";
  console.log(texto.toUpperCase()); 
  console.log(texto.toLowerCase()); 
  console.log("[" + texto.trim() + "]");      
  console.log("[" + texto.trimStart() + "]"); // [Hola Mundo  ]
  console.log("[" + texto.trimEnd() + "]");   // [  Hola Mundo]
  console.log("[" + texto + "]");            // [  Hola Mundo  ]
  // Estos métodos retornan cadenas nuevas; no modifican texto.
  // trim() conserva los espacios interiores.
}

// 1.5. Extracción con slice() y substring()
{
  console.log("\n1.5. Extracción");
  const texto = "JavaScript";
  console.log(texto.slice(0, 4));     // Java
  console.log(texto.slice(4));        // Script
  console.log(texto.slice(-6));       // Script
  console.log(texto.substring(0, 4)); // Java
  console.log(texto.substring(4, 0)); // Java: intercambia los límites
  console.log(texto.slice(4, 0));     // "": no intercambia los límites
  console.log(texto.substring(-4));  // JavaScript: -4 se trata como 0
  // El límite final no se incluye en ninguno de los dos métodos.
}

// EJERCICIO 02. Normalización y extracción
{
  const entrada = "  Desarrollo Web  ";
  // 1. Guarde una versión sin espacios exteriores.
  // 2. Obtenga una versión en minúsculas de la cadena limpia.
  // 3. Extraiga "Desarrollo" con slice() y "Web" con un índice negativo.
  // 4. Muestre entrada para comprobar que conserva sus espacios.
  // Desarrollo:
}

// 1.6. Búsquedas: indexOf(), lastIndexOf(), search(), includes(),
//      startsWith() y endsWith()
{
  console.log("\n1.6. Búsquedas en cadenas");
  const texto = "web y web";
  console.log(texto.indexOf("web"));     // 0
  console.log(texto.indexOf("web", 1));  // 6
  console.log(texto.lastIndexOf("web")); // 6
  console.log(texto.indexOf("css"));     // -1

  const contacto = "Contacto: 555-1234";
  console.log(contacto.search(/\d{3}-\d{4}/)); // 10
  // En este patrón, \d representa un dígito; {3} y {4} indican cantidades.
  console.log(contacto.search(/abc/)); // -1
  // search() usa expresiones regulares, incluso al recibir una cadena.
  console.log("abc".search("."));  // 0: el punto es un patrón
  console.log("abc".indexOf(".")); // -1: busca un punto literal

  const frase = "JavaScript es un lenguaje moderno";
  console.log(frase.includes("lenguaje"));     // true
  console.log(frase.includes("lenguaje", 20)); // false: empieza en 17
  console.log(frase.includes("javascript"));   // false: distingue mayúsculas
  const archivo = "informe.pdf";
  console.log(archivo.startsWith("informe")); // true
  console.log(archivo.endsWith(".pdf"));      // true
}

// EJERCICIO 03. Búsquedas
{
  const archivo = "guia.web.final.pdf";
  // 1. Obtenga la posición del primer punto y del último punto: 4 y 14.
  // 2. Compruebe si contiene "web", comienza con "guia" y termina con ".pdf".
  // 3. Busque "css" e interprete el resultado -1.
  // Desarrollo:
}

// 1.7. Reemplazo
{
  console.log("\n1.7. Reemplazo");
  const texto = "web, web, web";
  console.log(texto.replace("web", "JS"));    
  console.log(texto.replaceAll("web", "JS")); 
  console.log(texto.replace(/web/g, "JS"));    
  console.log(texto);                         
  // Con una cadena, replace() sustituye la primera coincidencia.
  // Con una expresión regular y la bandera g, sustituye todas.
}

// 1.8. Conversión de cadena a arreglo mediante split()
{
  console.log("\n1.8. split()");
  console.log("HTML,CSS,JS".split(",")); 
  console.log("Ana López".split(" "));  
  console.log("A|B|C".split("|"));      
  console.log("web".split(""));         
  console.log("Ana  López".split(" ")); 
  // Cada espacio es un separador; los consecutivos generan cadenas vacías.
  // split("") divide por unidades UTF-16, no siempre por caracteres visibles.
}

// 1.9. Conversiones entre cadenas y números
{
  console.log("\n1.9. Conversiones");
  console.log(String(2026));           // "2026"
  console.log(Number("25.50"));        // 25.5
  console.log(parseInt("21 calles", 10)); // 21; base decimal explícita
  console.log(parseInt("1e3", 10));    // 1
  console.log(parseFloat("12.50 USD")); // 12.5
  console.log(parseFloat("1,5"));      // 1: la coma no es separador decimal
  console.log(Number("12.50 USD"));    // NaN
  console.log(Number(""));             // 0: no sirve por sí solo para validar
  console.log(Number.isNaN(Number("hola"))); // true
  // parseInt() y parseFloat() leen el prefijo numérico que pueden interpretar.
  // Son funciones globales, no métodos de una cadena.
}

// 1.10. Plantillas literales: varias líneas, interpolación y expresiones
{
  console.log("\n1.10. Plantillas literales");
  const nombre = "Ana";
  const precio = 12.5;
  const cantidad = 2;
  console.log(`Cliente: ${nombre}`);           // Cliente: Ana
  console.log(`Total: $${precio * cantidad}`); // Total: $25
  const resumen = `Pedido
Cliente: ${nombre}
Unidades: ${cantidad}`;
  console.log(resumen); // Tres líneas
}

// EJERCICIO 04. Procesamiento de un pedido
{
  const entrada = "  CUADERNO;2;3.50  ";
  // 1. Elimine espacios exteriores y separe los campos mediante split().
  // 2. Acceda a cada campo con [0], [1] y [2].
  // 3. Convierta el nombre a minúsculas y cantidad y precio a números.
  // 4. Genere con una plantilla literal: "Producto: cuaderno | Total: $7".
  // 5. Reemplace "cuaderno" por "libreta" en el mensaje obtenido.
  // Desarrollo:
}

// 2. ARREGLOS (diapositivas 21 a 34)

// 2.1. Creación, longitud y acceso
{
  console.log("\n2.1. Creación y acceso a arreglos");
  const vacio = [];
  const lenguajes = ["HTML", "CSS", "JavaScript"];
  const mixto = ["Ana", 20, true];
  const conConstructor = new Array("a", "b", "c");
  const posicionesVacias = new Array(3);
  console.log(vacio.length);            // 0
  console.log(lenguajes.length);        // 3
  console.log(lenguajes[0]);            // HTML
  console.log(lenguajes[5]);            // undefined
  console.log(lenguajes.at(-1));        // JavaScript
  console.log(mixto);                  // ["Ana", 20, true]
  console.log(conConstructor);          // ["a", "b", "c"]
  console.log(posicionesVacias.length); // 3; tiene huecos, no tres valores
  lenguajes[0] = "HTML5";
  console.log(lenguajes[0]);            // HTML5
  // const impide reasignar lenguajes, pero permite modificar sus elementos.
  // Se prefiere la notación literal [] para estos ejemplos.
}

// 2.2. Añadir y eliminar en los extremos
{
  console.log("\n2.2. push, pop, unshift y shift");
  const letras = ["a", "b", "c"];
  console.log(letras.push("d"));    // 4: nueva longitud
  console.log(letras);              // ["a", "b", "c", "d"]
  console.log(letras.pop());        // d: elemento eliminado
  console.log(letras.unshift("z")); // 4: nueva longitud
  console.log(letras);              // ["z", "a", "b", "c"]
  console.log(letras.shift());      // z: elemento eliminado
  console.log(letras);              // ["a", "b", "c"]
  console.log([].pop());            // undefined
  // Los cuatro métodos modifican el arreglo original.
}

// 2.3. splice(): eliminar, insertar y reemplazar
{
  console.log("\n2.3. splice()");
  const frutas = ["manzana", "pera", "uva", "mango"];
  const eliminadas = frutas.splice(1, 2);
  console.log(frutas);     // ["manzana", "mango"]
  console.log(eliminadas); // ["pera", "uva"]

  const numeros = [1, 2, 5, 6];
  console.log(numeros.splice(2, 0, 3, 4)); // []: no se eliminó nada
  console.log(numeros);                   // [1, 2, 3, 4, 5, 6]

  const colores = ["rojo", "verde", "azul"];
  console.log(colores.splice(1, 1, "amarillo")); // ["verde"]
  console.log(colores); // ["rojo", "amarillo", "azul"]
  // splice(inicio, cantidadEliminar, ...elementosNuevos) muta el original
  // y retorna un arreglo con los elementos eliminados.
}

// EJERCICIO 05. Actualización de una lista
{
  const tareas = ["leer", "practicar", "entregar"];
  // 1. Agregue "revisar" al final y "planificar" al inicio.
  // 2. Reemplace "practicar" por "programar" mediante splice().
  // 3. Elimine la última tarea y conserve el valor retornado.
  // Resultado final: ["planificar", "leer", "programar", "entregar"].
  // Elemento retirado: "revisar".
  // Desarrollo:
}

// 2.4. Buscar elementos
{
  console.log("\n2.4. Búsquedas en arreglos");
  const frutas = ["manzana", "pera", "uva", "mango", "pera"];
  console.log(frutas.includes("pera"));    // true
  console.log(frutas.includes("fresa"));   // false
  console.log(frutas.indexOf("pera"));     // 1
  console.log(frutas.indexOf("pera", 2));  // 4
  console.log(frutas.lastIndexOf("pera")); // 4
  console.log(frutas.indexOf("fresa"));    // -1
  // No se debe usar indexOf() directamente como condición booleana:
  // 0 es una posición válida; -1 indica que no hubo coincidencia.
}

// EJERCICIO 06. Localizar antes de eliminar
{
  const participantes = ["Ana", "Luis", "Marta", "Luis"];
  // 1. Obtenga el primer y el último índice de "Luis": 1 y 3.
  // 2. Elimine únicamente la primera aparición, usando indexOf() y splice().
  // 3. Antes de eliminar, compruebe con if que el índice no sea -1.
  // 4. Repita la búsqueda con "Pedro" y compruebe que no se elimina nada.
  // Resultado final: ["Ana", "Marta", "Luis"].
  // Desarrollo:
}

// 2.5. Inversión y ordenación (fragmento retirado de la diapositiva 31)
// Los casos se separan para poder ejecutarse y explicarse uno por uno.

// 2.5.1. reverse(): modifica el orden del arreglo original
{
  console.log("\n2.5.1. reverse()");
  const numeros = [4, 2, 8, 1, 6];
  numeros.reverse();
  console.log(numeros); // [6, 1, 8, 2, 4]
  // Invertir el orden no equivale a ordenar de mayor a menor.
}

// 2.5.2. toReversed(): crea un arreglo con el orden invertido
{
  console.log("\n2.5.2. toReversed()");
  const original = [4, 2, 8, 1, 6];
  const invertido = original.toReversed();
  console.log(invertido); // [6, 1, 8, 2, 4]
  console.log(original);  // [4, 2, 8, 1, 6]
}

// 2.5.3. sort() y toSorted() sin comparador
{
  console.log("\n2.5.3. Ordenación de cadenas");
  const letras = ["d", "a", "c", "b"];
  letras.sort();
  console.log(letras); // ["a", "b", "c", "d"]

  const originales = ["d", "a", "c", "b"];
  const ordenadas = originales.toSorted();
  console.log(ordenadas);  // ["a", "b", "c", "d"]
  console.log(originales); // ["d", "a", "c", "b"]
  // Sin comparador, se ordenan las representaciones textuales según UTF-16.
  // No es una ordenación lingüística que contemple las reglas de cada idioma.
}

// 2.5.4. Ordenación numérica
{
  console.log("\n2.5.4. Ordenación numérica");
  const datos = [10, 2, 5, 1, 20];
  console.log(datos.toSorted()); // [1, 10, 2, 20, 5]: comparación textual
  console.log(datos.toSorted((a, b) => a - b)); // [1, 2, 5, 10, 20]
  console.log(datos.toSorted((a, b) => b - a)); // [20, 10, 5, 2, 1]
  console.log(datos); // [10, 2, 5, 1, 20]: permanece igual

  datos.sort((a, b) => a - b);
  console.log(datos); // [1, 2, 5, 10, 20]: ahora sí se modificó
  // (a, b) => a - b es una función comparadora.
  // Resultado negativo: a debe ir antes que b.
  // Resultado positivo: a debe ir después que b.
  // Resultado cero: ambos conservan su orden relativo.
}

// EJERCICIO 07. Comparar inversión y ordenación
{
  const precios = [25, 8, 100, 12];
  // 1. Cree una versión invertida sin modificar precios.
  // 2. Cree versiones ordenadas numéricamente de menor a mayor y viceversa.
  // 3. Muestre precios para comprobar que se conserva.
  // 4. Finalmente, ordene precios de menor a mayor modificándolo.
  // Resultados: [12, 100, 8, 25], [8, 12, 25, 100], [100, 25, 12, 8].
  // Explique por qué reverse() no sustituye al comparador descendente.
  // Desarrollo:
}

// 2.6. concat(): combinar sin modificar los originales
{
  console.log("\n2.6. concat()");
  const grupoA = ["Ana", "Luis"];
  const grupoB = ["Marta", "José"];
  const todos = grupoA.concat(grupoB);
  console.log(todos);  // ["Ana", "Luis", "Marta", "José"]
  console.log(grupoA); // ["Ana", "Luis"]
}

// 2.7. slice(): extraer o copiar sin modificar el original
{
  console.log("\n2.7. slice() en arreglos");
  const numeros = [1, 2, 3, 4, 5];
  console.log(numeros.slice(1, 3)); // [2, 3]
  console.log(numeros.slice(2));    // [3, 4, 5]
  console.log(numeros.slice(-2));   // [4, 5]
  const copia = numeros.slice();
  copia[0] = 99;
  console.log(copia);   // [99, 2, 3, 4, 5]
  console.log(numeros); // [1, 2, 3, 4, 5]
  // slice() no elimina elementos; splice() sí puede hacerlo.
  // La copia es superficial; se retomará este concepto al trabajar spread.
}

// 2.8. join(): convertir un arreglo en cadena
{
  console.log("\n2.8. join()");
  const palabras = ["JavaScript", "es", "útil"];
  console.log(palabras.join(" ")); // JavaScript es útil
  console.log(palabras.join("-")); // JavaScript-es-útil
  console.log(palabras.join(""));  // JavaScriptesútil
  console.log(palabras.join());    // JavaScript,es,útil
}

// EJERCICIO 08. Combinar, extraer y presentar
{
  const primeraParte = ["HTML", "CSS"];
  const segundaParte = ["JavaScript", "Bootstrap"];
  // 1. Combine ambos arreglos con concat().
  // 2. Obtenga los primeros tres elementos mediante slice().
  // 3. Genere la cadena "HTML | CSS | JavaScript" mediante join().
  // 4. Compruebe que los arreglos iniciales permanecen sin cambios.
  // Desarrollo:
}

// 3. OBJETOS (diapositivas 36 a 45)

// 3.1. Objeto literal y acceso a propiedades
{
  console.log("\n3.1. Objeto literal y propiedades");
  const producto = { nombre: "Cuaderno", precio: 2.5, disponible: true };
  console.log(producto.nombre);    // Cuaderno
  console.log(producto["precio"]); // 2.5
  const clave = "disponible";
  console.log(producto[clave]);    // true: evalúa el contenido de clave
  console.log(producto.clave);     // undefined: busca la propiedad "clave"
  console.log(producto.categoria); // undefined
  // Un objeto agrupa propiedades cuyos valores pueden tener distintos tipos.
}

// 3.2. Agregar y modificar propiedades
{
  console.log("\n3.2. Agregar y modificar propiedades");
  const producto = { nombre: "Cuaderno", precio: 2.5 };
  producto.categoria = "Papelería";
  producto["existencias"] = 20;
  producto.precio = 3;
  console.log(producto.precio);      // 3
  console.log(producto.categoria);   // Papelería
  console.log(producto.existencias); // 20
  // const permite estas modificaciones; no permite producto = otroObjeto.
}

// EJERCICIO 09. Ficha de un curso
{
  const curso = { nombre: "Desarrollo Web I", cupo: 30 };
  const propiedad = "nombre";
  // 1. Agregue las propiedades modalidad ("Presencial") y activo (true).
  // 2. Actualice cupo a 36.
  // 3. Consulte el nombre mediante la variable propiedad y corchetes.
  // 4. Genere: "Desarrollo Web I: 36 cupos".
  // Desarrollo:
}

// 3.3. Métodos de un objeto
{
  console.log("\n3.3. Métodos");
  const persona = {
    nombre: "Ana",
    saludar: function () {
      return `Hola, soy ${this.nombre}`;
    }
  };
  console.log(persona.saludar()); // Hola, soy Ana
  // En esta llamada, persona.saludar(), this se refiere a persona.
  // El valor de this depende de cómo se invoque la función.
  // Retornar un mensaje y mostrarlo en consola son operaciones distintas.
}

// 3.4. toString(): representación textual
{
  console.log("\n3.4. toString()");
  const vacio = {};
  console.log(vacio.toString()); // [object Object]
  const jugador = {
    nombre: "Ana",
    vida: 4,
    vidaMaxima: 6,
    toString: function () {
      return `${this.nombre} (${this.vida}/${this.vidaMaxima})`;
    }
  };
  console.log(jugador.toString());         // Ana (4/6)
  console.log("Mi jugador es " + jugador); // Mi jugador es Ana (4/6)
}

// 3.5. Objetos anidados
{
  console.log("\n3.5. Objetos anidados");
  const estudiante = {
    nombre: "Marta",
    contacto: { correo: "marta@example.com", ciudad: "Santa Tecla" },
    cursos: ["Desarrollo Web I", "Métricas de Software"]
  };
  console.log(estudiante.contacto.ciudad);    // Santa Tecla
  console.log(estudiante.cursos[0]);          // Desarrollo Web I
  estudiante.contacto.ciudad = "San Salvador";
  console.log(estudiante.contacto.ciudad);    // San Salvador
}

// 3.6. Recorrido de propiedades con for...in
{
  console.log("\n3.6. for...in");
  const producto = { nombre: "Lápiz", precio: 0.5, existencias: 10 };
  for (const propiedad in producto) {
    if (Object.hasOwn(producto, propiedad)) {
      console.log(`${propiedad}: ${producto[propiedad]}`);
    }
  }
  // nombre: Lápiz
  // precio: 0.5
  // existencias: 10
  // for...in incluye propiedades enumerables heredadas con claves de cadena.
  // Object.hasOwn() limita la salida a las propiedades propias del objeto.
}

// EJERCICIO 10. Objeto con método y datos anidados
{
  const libro = {
    titulo: "Fundamentos de JavaScript",
    autor: { nombre: "Ana López", pais: "El Salvador" },
    capitulos: ["Cadenas", "Arreglos", "Objetos"]
  };
  // 1. Muestre el país del autor y el último capítulo.
  // 2. Agregue un método describir() que retorne, usando this:
  //    "Fundamentos de JavaScript, de Ana López. Capítulos: 3".
  // 3. Invoque el método y muestre su retorno.
  // 4. Recorra con for...in las propiedades propias de libro.autor.
  // Desarrollo:
}

// 4. DESESTRUCTURACIÓN (diapositivas 46 a 54)

// 4.1. Arreglos: extracción, omisión, valores predeterminados y rest
{
  console.log("\n4.1. Desestructuración de arreglos");
  const colores = ["rojo", "verde", "azul"];
  const [primero, segundo, tercero] = colores;
  console.log(primero, segundo, tercero); // rojo verde azul

  const numeros = [1, 2, 3, 4, 5];
  const [inicial, , tercerValor] = numeros;
  console.log(inicial, tercerValor); // 1 3

  const [x, y = 0, z = 0] = [10];
  console.log(x, y, z); // 10 0 0
  const [a = 9, b = 9, c = 9] = [undefined, null, 0];
  console.log(a, b, c); // 9 null 0
  // El valor predeterminado se aplica a undefined, no a null ni a 0.

  const [cabeza, ...resto] = numeros;
  console.log(cabeza); // 1
  console.log(resto);  // [2, 3, 4, 5]
  // Rest reúne los elementos restantes y debe colocarse al final del patrón.
}

// EJERCICIO 11. Desestructurar un registro
{
  const registro = ["WEB01", "Desarrollo Web I", 36, "martes", "jueves"];
  // 1. Extraiga codigo y cupo; omita el nombre con una posición vacía.
  // 2. Capture los días restantes en un arreglo mediante rest.
  // 3. En otra desestructuración de [8], extraiga hora y minuto;
  //    utilice 0 como valor predeterminado para minuto.
  // Resultados: "WEB01", 36, ["martes", "jueves"], 8 y 0.
  // Desarrollo:
}

// 4.2. Objetos: extracción, alias, valores predeterminados y rest
{
  console.log("\n4.2. Desestructuración de objetos");
  const persona = { nombre: "Ana", edad: 25, ciudad: "Santa Tecla" };
  const { nombre, edad } = persona;
  console.log(nombre, edad); // Ana 25

  const { nombre: nombreCompleto, ciudad: residencia } = persona;
  console.log(nombreCompleto, residencia); // Ana Santa Tecla
  // A la izquierda de : está la clave; a la derecha, el nombre de la variable.

  const { rol = "estudiante" } = persona;
  console.log(rol); // estudiante
  const { activo = true } = { activo: false };
  console.log(activo); // false: no se sustituye por el valor predeterminado

  const { nombre: nombreExtraido, ...otrosDatos } = persona;
  console.log(nombreExtraido); // Ana
  console.log(otrosDatos);     // { edad: 25, ciudad: "Santa Tecla" }
  // El objeto original conserva todas sus propiedades.
}

// EJERCICIO 12. Extraer propiedades de un producto
{
  const producto = { id: 10, nombre: "Cuaderno", precio: 2.5, stock: 20 };
  // Mediante desestructuración:
  // 1. Guarde nombre en una variable llamada nombreProducto.
  // 2. Extraiga precio y categoria, con "Papelería" como valor predeterminado.
  // 3. Reúna id y stock en un objeto llamado resto.
  // 4. Muestre los resultados y confirme que producto no se modificó.
  // Desarrollo:
}

// 5. SPREAD (diapositivas 55 a 60)

// 5.1. Copiar arreglos: diferencia entre asignación y copia
{
  console.log("\n5.1. Copia con spread");
  const original = [1, 2, 3];
  const alias = original;
  const copia = [...original];
  alias.push(4);
  console.log(original); // [1, 2, 3, 4]: alias comparte la referencia
  console.log(copia);    // [1, 2, 3]: es otro arreglo
  copia[0] = 99;
  console.log(original[0]); // 1
  console.log(copia[0]);    // 99
}

// 5.2. Concatenar arreglos
{
  console.log("\n5.2. Concatenación con spread");
  const primeraParte = [1, 2, 3];
  const segundaParte = [4, 5, 6];
  const combinado = [...primeraParte, ...segundaParte];
  console.log(combinado); // [1, 2, 3, 4, 5, 6]
  console.log(primeraParte); // [1, 2, 3]
}

// 5.3. Extender objetos y sobrescribir propiedades
{
  console.log("\n5.3. Spread en objetos");
  const base = { nombre: "Ana", rol: "estudiante" };
  const ampliado = { ...base, activo: true };
  const actualizado = { ...base, rol: "docente" };
  const otroOrden = { rol: "docente", ...base };
  console.log(ampliado.activo);   // true
  console.log(actualizado.rol);   // docente
  console.log(otroOrden.rol);     // estudiante: prevalece la última escritura
  console.log(base.rol);          // estudiante
  // {...objeto} copia propiedades propias enumerables.
  // No requiere que el objeto sea iterable. [...base] produciría TypeError.
}

// 5.3.1. Límite de la copia: los datos anidados siguen compartidos
{
  console.log("\n5.3.1. Copia superficial");
  const original = { nombre: "Ana", direccion: { ciudad: "Santa Tecla" } };
  const copia = { ...original };
  copia.nombre = "Marta";
  copia.direccion.ciudad = "San Salvador";
  console.log(original.nombre);           // Ana
  console.log(original.direccion.ciudad); // San Salvador
  // Se copió el primer nivel, pero direccion sigue siendo el mismo objeto.
  // slice(), concat() y spread en arreglos también conservan las referencias
  // de los objetos que contienen. Una copia superficial no es una copia profunda.
}

// 5.4. Pasar elementos como argumentos de una función
{
  console.log("\n5.4. Spread en argumentos");
  const numeros = [4, 9, 2];
  console.log(Math.max(...numeros)); // 9; equivale a Math.max(4, 9, 2)
  console.log(Math.min(...numeros)); // 2
  // En arreglos y argumentos, spread requiere un iterable.
  // Rest reúne valores; spread los expande. El contexto distingue su uso.
}

// EJERCICIO 13. Actualizar sin modificar el primer nivel original
{
  const precios = [12, 8, 20];
  const configuracion = { tema: "claro", idioma: "es" };
  // 1. Cree con spread otro arreglo que incluya los precios y agregue 15.
  // 2. Obtenga su máximo con Math.max() y spread: 20.
  // 3. Cree otra configuración con tema "oscuro" y activo: true.
  // 4. Verifique que configuracion.tema siga siendo "claro".
  // 5. Explique qué cambiaría si tema se escribiera antes de ...configuracion.
  // Desarrollo:
}

// EJERCICIO 14. Integración final
{
  const nombreIngresado = "  ANA LÓPEZ  ";
  const cursosIngresados = "HTML,CSS,JavaScript";
  const notas = [8, 10, 7];
  // 1. Limpie el nombre y conviértalo a minúsculas.
  // 2. Transforme cursosIngresados en un arreglo.
  // 3. Cree un objeto estudiante con nombre, cursos y notas.
  // 4. Cree una copia superficial del objeto y agregue activo: true.
  // 5. Extraiga nombre y cursos mediante desestructuración del objeto.
  // 6. Extraiga el primer curso y los restantes mediante desestructuración
  //    del arreglo y rest.
  // 7. Ordene una copia de notas de mayor a menor, conservando notas.
  // 8. Obtenga la nota máxima con Math.max() y spread.
  // 9. Genere: "ana lópez | Cursos: HTML, CSS, JavaScript | Nota máxima: 10".
  // 10. Explique si modificar copia.notas[0] afectaría estudiante.notas[0].
  //     Compruebe la predicción después de mostrar los resultados anteriores.
  // Desarrollo:
}
