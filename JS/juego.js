const preguntasRespuestas = require("")
let indicePreguntaActual = 0;


function mostrarPregunta() {
    const preguntaContainer = document.getElementById("pregunta-container");
    preguntaContainer.innerHTML = "";

    const preguntaActual = preguntasRespuestas[indicePreguntaActual];
    const preguntaElemento = document.createElement("div");
    preguntaElemento.innerHTML = "<p>" + preguntaActual.question + "</p>";

    preguntaActual.answers.forEach(function (respuesta, index) {
        preguntaElemento.innerHTML += "<input type='radio' name='respuesta' value='" + index + "'>" + respuesta + "<br>";
    });


preguntaContainer.appendChild(preguntaElemento);
}

function siguientePregunta() {
    let respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');

    if (respuestaSeleccionada) {
        var respuestaIndex = parseInt(respuestaSeleccionada.value);

        if (preguntasRespuestas[indicePreguntaActual].answers[respuestaIndex] === preguntasRespuestas[indicePreguntaActual].correct) {
            puntaje++;
        }

        indicePreguntaActual++;

        if (indicePreguntaActual < preguntasRespuestas.length) {
            mostrarPregunta();
        } else {
            alert("Juego terminado. Puntaje final: " + puntaje + "/" + preguntasRespuestas.length);
        }
    } else {
        alert("Selecciona una respuesta antes de pasar a la siguiente pregunta.");
    }
}
// Iniciar el juego mostrando la primera pregunta
mostrarPregunta();

function ayuda() {
    Swal.fire({
      title: "Ayuda",
      text: preguntasRespuestas[0].ayuda,
      //imageUrl: objetoPregunta.ayudaImg,
      imageHeight: 300,
    });
  }  

  

  