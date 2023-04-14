const letras = document.querySelectorAll(".letra");
const result = document.querySelector(".result");
const definiciones = document.querySelector(".definiciones");
const entrada = document.querySelector(".entrada");
const wordlerDB = [];
fetch("https://sheet.best/api/sheets/3760199c-7456-4774-bfae-643cb202c76d")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(item =>{
            wordlerDB.push(item.Palabra);
        })
    })
    .catch((error) => {
        console.error(error);
    });

let lista_filtrada = [];
let palabras_repetidas = [];
let arreglos_usados = [];
let una_letra = "";

function filtrar(){
    lista_filtrada = [];
    arreglos_usados = [];
    palabras_repetidas = [];
    una_letra = "";
    un_index = 0;
    
    letras.forEach((letra, index) =>{
        if(letra.value.length > 0){
            arreglos_usados.push([letra.value, index]);
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
}

let filtrarUnaLista = () => {
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(un_index) === una_letra){
            lista_filtrada.push(palabra);
        }
    });

    mostrarResultado();
}

function verificarListas (){
    let numero_palabras ={};

    arreglos_usados.forEach((letra) =>{
        wordlerDB.forEach((palabra) =>{
            if(palabra.charAt(letra[1]) === letra[0]){
                lista_filtrada.push(palabra);
            }
        })
    });


    for (let i = 0; i < lista_filtrada.length; i++){
        let palabra = lista_filtrada[i];
        if(numero_palabras[palabra]){
            numero_palabras[palabra]++;

            if(numero_palabras[palabra] === (arreglos_usados.length)){
                palabras_repetidas.push(palabra);
            }
        }else
        {
            numero_palabras[palabra] = 1;
        }
    }

    mostrarResultadoFiltro();
}

let limpiarResultados = () => {
    while(result.firstChild){
     result.removeChild(result.firstChild);
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
function agregarClick() {
    palabras = document.querySelectorAll("li");
  
    palabras.forEach((palabra) => {
      palabra.addEventListener("click", (event) => {
        event.preventDefault();
  
        obtenerDefinicion(palabra.textContent)
          .then((definicion) => {
            entrada.textContent = palabra.textContent;
            definiciones.textContent = definicion;
          })
          .catch((error) => {
            entrada.textContent = palabra.textContent;
            definiciones.textContent =
              "No se encontró una definición para esta palabra";
          });
      });
    });
  }
  

function obtenerDefinicion(palabra){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`;

    return fetch(url).then(response =>{
        if(!response.ok){
            throw new Error('Fallo al obtener la definición.');
        }

        return response.json();

    }).then(data => {
        if(data.length === 0){
            throw new error('No se encontró ninguna definición.')
        }

        /* metodo 1 trae la primera definición del diccionario 
        const definicion = data[0].meanings[0].definitions[0].definition;

         return definicion;

         */

         /* metodo 2 trae todas las definiciones de una palabra en una cadena de texto */
        const definicion = data.flatMap( entry => {
            return entry.meanings.flatMap(meaning => {
                return meaning.definitions.map(definition => {
                    return definition.definition;
                })
            })
        });

        return definicion.join('\n');

    });
}


  