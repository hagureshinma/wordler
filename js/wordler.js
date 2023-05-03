const letras = document.querySelectorAll(".letra");
const result = document.querySelector(".result");
const definiciones = document.querySelector(".definiciones");
const entrada = document.querySelector(".entrada");
const pronunciacion = document.getElementById("pronunciacion");
//obtener un listado de todas las palabras de 5 letras

let palabras = [];

// Load the word list file
fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
  .then(response => response.text())
  .then(data => {
    // Split the file content into an array of words
    const words = data.split(/\r?\n/);
    
    // Filter the array to get only 5-letter words
    const fiveLetterWords = words.filter(word => word.length === 5);

    fiveLetterWords.forEach((palabra) =>{
      palabras.push(palabra);
    })
    
  })
  .catch(error => console.error(error));

//fin obtener el listado de palabras

let lista_filtrada = [];
let palabras_repetidas = [];
let arreglos_usados = [];
let una_letra = "";

function filtrar(){
    lista_filtrada = [];
    // arreglos_usados = [];
    palabras_repetidas = [];
    una_letra = "";
    un_index = 0;
    limpiarResultados();
    limpiarDefiniciones();
    
    letras.forEach((letra, index) =>{
        if(letra.value.length > 0){
            arreglos_usados.push([letra.value, index]);
            //estas 2 variables existen de momento porque no sé como agarrar un solo valor de un arreglo de arreglos :p
            una_letra = letra.value;
            un_index = index;
        }
    });

    if(arreglos_usados.length > 1){
        verificarListas(false);
    }
    else if(arreglos_usados.length === 1){
        filtrarUnaLista(true);
    }
    arreglos_usados = [];
}

let filtrarUnaLista = () => {
    palabras.forEach((palabra_filtrar) => {
        if(palabra_filtrar.charAt(un_index) === una_letra){
            lista_filtrada.push(palabra_filtrar);
        }
    });

    mostrarResultado();
}

function verificarListas (){
    let numero_palabras ={};
    arreglos_usados.forEach((letra) =>{
        palabras.forEach((palabra_filtrar) =>{
            if(palabra_filtrar.charAt(letra[1]) === letra[0]){
                lista_filtrada.push(palabra_filtrar);
            }
        })
    });


    for (let i = 0; i < lista_filtrada.length; i++){
        let agregar_palabra = lista_filtrada[i];
        if(numero_palabras[agregar_palabra]){
            numero_palabras[agregar_palabra]++;

            if(numero_palabras[agregar_palabra] === (arreglos_usados.length)){
                palabras_repetidas.push(agregar_palabra);
            }
        }else
        {
            numero_palabras[agregar_palabra] = 1;
        }
    }

    mostrarResultadoFiltro();
}

let limpiarResultados = () => {
    while(result.firstChild){
     result.removeChild(result.firstChild);
    }
}

let limpiarDefiniciones = () => {
    pronunciacion.textContent = "";
    while(definiciones.firstChild){
        definiciones.removeChild(definiciones.firstChild);
    }
}

function mostrarResultado(){
    
    limpiarResultados();

    let arreglo_no_duplicados = [...new Set(lista_filtrada)]
    arreglo_no_duplicados.forEach((palabra) =>{
        let li = document.createElement("li");
        result.appendChild(li);
        li.append(palabra);
    });

    agregarClick();

}
function mostrarResultadoFiltro(){
    
    limpiarResultados();

    palabras_repetidas.forEach((palabra) =>{
        let li = document.createElement("li");
        result.appendChild(li);
        li.append(palabra);
    });

    agregarClick();
}

//agrego evento click y definiciones a la lista de palabras que se creen.
function agregarClick(){
    Lista_palabras = document.querySelectorAll("li");

    Lista_palabras.forEach((palabra) => {
        palabra.addEventListener('click', event => {
            event.preventDefault();

            obtenerDefinicion(palabra.textContent).then(definicion => {
                entrada.textContent = palabra.textContent;
            }).catch(error => {
                entrada.textContent = palabra.textContent;
                definiciones.textContent = "We didn't find a definition for this word";
            }); 
        })
    })
}

async function obtenerDefinicion(palabra){

    limpiarDefiniciones();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fallo al obtener la definición.');
    }
    const data = await response.json();
    if (data.length === 0) {
        throw new error('No se encontró ninguna definición.');
    }

    const phonetics = data[0].phonetics[0].text;
    pronunciacion.textContent = phonetics;

    if(data[0].phonetics[0].audio){
        const palabra_audio = document.createElement('audio');
        const salto = document.createElement('br');
        palabra_audio.setAttribute('src', data[0].phonetics[0].audio);
        palabra_audio.setAttribute('controls', '');
        pronunciacion.appendChild(salto);
        pronunciacion.appendChild(palabra_audio);
    }

    const dDefiniciones = data.flatMap(entry => {
        return entry.meanings.flatMap(meaning => {
            return meaning.definitions.map(definition => {
                return definition.definition;
            });
        });
    });
    const definicionesHTML = dDefiniciones.forEach((definicion) => {
        const p = document.createElement('p');
        p.textContent = definicion;
        definiciones.appendChild(p);
    });
    return definicionesHTML;
}