function myfunc(event) {
  event.preventDefault();
    const name1 = document.getElementById('Jugador1').value;
    const name2 = document.getElementById('Jugador2').value;
    const name3 = document.getElementById('Jugador3').value;
    const name4 = document.getElementById('Jugador4').value;
    const tamanocarton = document.getElementById('tamañoCarton').value;

    localStorage.setItem('Jugador1', name1);
    localStorage.setItem('Jugador2', name2);
    localStorage.setItem('Jugador3', name3);
    localStorage.setItem('Jugador4', name4);
    localStorage.setItem('tamañoCarton', tamanocarton);
    console.log(tamanocarton);
    console.log('Guardado con éxito');

    localStorage.setItem('puntaje1', 0);
    localStorage.setItem('puntaje2', 0);  
    localStorage.setItem('puntaje3', 0);
    localStorage.setItem('puntaje4', 0);
}



function generarNumerosAleatorios() {
  const numerosGenerados = [];
  while (numerosGenerados.length < 25) {
    const numeroAleatorio = Math.floor(Math.random() * 50) + 1;
    
   
    if (numerosGenerados.indexOf(numeroAleatorio) === -1) {
      numerosGenerados.push(numeroAleatorio);
    }
    
  }

  return numerosGenerados;
}

function generarCarton() {
  const carton = [];
  const numerosGenerados = generarNumerosAleatorios();
  const tamanocarton = parseInt(localStorage.getItem('tamañoCarton'));
  for (let i = 0; i < tamanocarton; i++) {
    carton[i] = [];
    for (let j = 0; j < tamanocarton; j++) {
      carton[i][j] = numerosGenerados[i * tamanocarton + j];
    }
  }
  return carton;
}
const cartones = [];
function generar4Cartones(){
  for (let i = 0; i < 4; i++) {
    cartones[i] = generarCarton();
    localStorage.setItem('cartones', cartones);
  }
  generarYMostrarCartones(cartones);
  return cartones;
}




function generarYMostrarCartones(lista){
  
  const contenedorCartones = document.getElementById('espacioCartones');


  for (let k = 0; k < lista.length; k++) {
     
      const nuevoContenedor = document.createElement("div");
      nuevoContenedor.classList.add("carton"); 
      const tabla = document.createElement("table");
      tabla.setAttribute("border", "1");
      tabla.style.display = "none"; 


      for (let i = 0; i < lista[k].length; i++) {
          const fila = document.createElement("tr");
          for (let j = 0; j < lista[k][i].length; j++) {
              const completo = document.createElement("td");
              completo.innerHTML = lista[k][i][j];
              fila.appendChild(completo);
          }
          tabla.appendChild(fila);
      }

      
      nuevoContenedor.appendChild(tabla);

      
      const boton = document.createElement("button");
      boton.textContent = "Ver/Ocultar Jugador " + localStorage.getItem('Jugador' + (k + 1));
      boton.addEventListener("click", function() {
          if (tabla.style.display === "none") {
              tabla.style.display = "table";
          } else {
              tabla.style.display = "none";
          }
      });

      
      nuevoContenedor.appendChild(boton);

      
      contenedorCartones.appendChild(nuevoContenedor);
  }
}
let listaNumeros = generarNumerosAleatorios();
let indiceMostrado = 0;

function mostrarSiguienteNumero() {
  if (indiceMostrado < listaNumeros.length) {
    document.getElementById('quedan').textContent = "Quedan " + (listaNumeros.length - indiceMostrado) + " números por mostrar";
    document.getElementById('numeroMostrado').textContent = listaNumeros[indiceMostrado];
    
    for (let k = 0; k < cartones.length; k++) {
      let lineaHorizontalDetectada = verificarLineaHorizontal(k);
      const carton = cartones[k];
      const celdas = document.querySelectorAll('#espacioCartones .carton:nth-child(' + (k+2) + ') td');
      for (let i = 0; i < carton.length; i++) {
        for (let j = 0; j < carton[i].length; j++) {
          if (carton[i][j] === parseInt(document.getElementById('numeroMostrado').textContent)) {
            const index = i * [carton[i].length] + j;
          if (index < celdas.length) {
                celdas[index].classList.add('marcado');
                console.log('El número ' + carton[i][j] + ' está en el cartón ' + (k + 1));
          }
        }
      }
    }
  }
    indiceMostrado++;
  } else {
    document.getElementById('numeroMostrado').textContent = "¡Ya no hay más números!";
    document.getElementById('quedan').textContent = "";
    mostrarPuntajes();
  }
}

function verificarLineaHorizontal(idJugador) {
  const filas = document.querySelectorAll('#espacioCartones .carton table tr');
  for (let i = 0; i < filas.length; i++) {

      const celdas = filas[i].querySelectorAll('td');
      let lineaCompleta = true;
      console.log(celdas[i].classList[0]);

      for (let j = 0; j < celdas.length; j++) {
          if (!celdas[j].classList.contains('marcado')) {
              lineaCompleta = false;
              break;
          }if (lineaCompleta && !celdas[i].classList.contains('lineaCompleta')) {
            celdas[i].classList.add('lineaCompleta');
            console.log('Línea horizontal detectada en la fila ' + (i + 1)); 
            
            console.log('Jugador' + idJugador);
            const jugadorActual = idJugador; 
            const nombreJugador = localStorage.getItem('Jugador' + jugadorActual);
            console.log(nombreJugador);
            console.log(localStorage.getItem( 'puntaje1' + idJugador));
            let puntajeJugador = parseInt(localStorage.getItem( 'puntaje' + idJugador)) || 0;
            puntajeJugador += 1;
            localStorage.setItem('puntaje' + idJugador, puntajeJugador);
        
            lineaHorizontalDetectada = true; 
          }
          console.log('linea completa: ' + lineaCompleta);
            
          return true; 
  }

  return false;
}
}

function mostrarPuntajes() {
  
  const puntajesContainer = document.createElement('div');
  puntajesContainer.id = 'puntajes-container';

  
  for (let i = 1; i <= 4; i++) {
      const nombreJugador = localStorage.getItem('Jugador' + i);
      const puntajeJugador = parseInt(localStorage.getItem(nombreJugador + '_puntaje')) || 0;

      
      const puntajeElement = document.createElement('div');
      puntajeElement.textContent = nombreJugador + ': ' + puntajeJugador + ' puntos';

      
      puntajesContainer.appendChild(puntajeElement);
  }
  document.body.appendChild(puntajesContainer);
}

