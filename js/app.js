// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Eventos
eventListener();
function eventListener() {
  // Cuando se agrega un nuevo Tweet
  formulario.addEventListener("submit", agregarTweet);
  // Cuando el documento esté listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    crearHTML();
  });
}

// Funciones
function agregarTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;

  // Validación
  if (tweet.trim() === "") {
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
      // Agregar un botón para eliminar el tweet
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "Eliminar";

      // Añadir la función de eliminar con confirmación
      btnEliminar.onclick = () => {
        if (confirm("¿Estás seguro de que deseas eliminar este tweet?")) {
          borrarTweet(tweet.id);
        }
      };

      // Crear HTML
      const li = document.createElement("li");
      // Añadir texto
      li.innerText = tweet.tweet;

      // Asignar el botón eliminar
      li.appendChild(btnEliminar);
      // Insertar en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agregar tweet al localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

// Limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
