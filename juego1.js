let indicePreguntaActual = 0;
let puntaje = 0;

async function obtenerPreguntasRespuestas() {
  const respuesta = await fetch("preguntasRespuestas.json");
  return respuesta.json();
}

async function mostrarPregunta(preguntasRespuestas) {
  const preguntaActual = preguntasRespuestas[indicePreguntaActual];
  const preguntaContainer = document.getElementById("pregunta-container");
  preguntaContainer.innerHTML = "";
  
  const preguntaElemento = document.createElement("div");
  preguntaElemento.innerHTML = "<p>" + preguntaActual.question + "</p>";
  preguntaActual.answers.forEach(function (respuesta, index) {
    preguntaElemento.innerHTML += "<input type='radio' name='respuesta' value='" + index + "'>" + respuesta + "<br>";
  });
  preguntaContainer.appendChild(preguntaElemento);
}

async function iniciarJuego() {
  const preguntasRespuestas = await obtenerPreguntasRespuestas();
  mostrarPregunta(preguntasRespuestas);
}


async function siguientePregunta() {
    let respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');
    const preguntasRespuestas = await obtenerPreguntasRespuestas();
    if (respuestaSeleccionada) {
      let respuestaIndex = parseInt(respuestaSeleccionada.value);
      if (preguntasRespuestas[indicePreguntaActual].answers[respuestaIndex] === preguntasRespuestas[indicePreguntaActual].correct) {
        puntaje++;
        indicePreguntaActual++;
        if (indicePreguntaActual < preguntasRespuestas.length) {
          await mostrarPregunta(preguntasRespuestas);
        } else {
          alert("Juego terminado. Puntaje final: " + puntaje + "/" + preguntasRespuestas.length);
        }
      } else {
        alert("Respuesta incorrecta. Intenta de nuevo.");
      }
    } else {
      alert("Selecciona una respuesta antes de pasar a la siguiente pregunta.");
    }
  }
  
// Iniciar el juego mostrando la primera pregunta
iniciarJuego();


// En la función obtenerYMostrarAyuda(), pasa también el índice de la pregunta actual
async function obtenerYMostrarAyuda() {
  // Llama a la función obtenerPreguntasRespuestas para obtener los datos
  const preguntasRespuestas = await obtenerPreguntasRespuestas();
  
   // Llama a la función ayuda pasándole los datos obtenidos y el índice de la pregunta actual
   ayuda(preguntasRespuestas, indicePreguntaActual);
}

// Función de ayuda que ahora recibe preguntasRespuestas como argumento
function ayuda(preguntasRespuestas, indicePreguntaActual) {
  // Utiliza SweetAlert para mostrar la ayuda
  Swal.fire({
    title: "Ayuda",
    text: preguntasRespuestas[indicePreguntaActual].ayuda,
    height: 300,
  });
}



