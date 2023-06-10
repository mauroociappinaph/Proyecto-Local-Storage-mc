// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Eventos
eventListener();
function eventListener() {
  //Cuando se agrega un nuevo Tweet
  formulario.addEventListener("submit", agregarTweet);
  //Cuando el documento este listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets") || "[]");

    console.log(tweets);
    crearHTML();
  });
}

// Funciones
function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;

  // Validación
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacío");
    return;
  }
  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir tweet al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // Crear HTML
  crearHTML();

  // Reiniciar formulario
  formulario.reset();
}

// Mostrar un mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // Insertar contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // Eliminar alerta después de los 3 seg
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Crear HTML
      const li = document.createElement("li");
      //Añadir texto
      li.innerText = tweet.tweet;
      //Insertar en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agregar tweet al localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
