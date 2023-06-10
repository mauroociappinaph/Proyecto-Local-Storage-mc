// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Eventos
formulario.addEventListener("submit", agregarTweet);

// Funciones
function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;

  // Validación
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vació");
    return;
  }
  console.log("agregando tweet");
}

//Mostrar un mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertar contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  //Eliminar alerta después de los 3 seg
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}
