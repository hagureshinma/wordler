const letras = document.querySelectorAll(".letra");
const result = document.querySelector(".result");
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

let listaAlfa = [];
let lista_2 = [];
let lista_3 = [];
let lista_4 = [];
let lista_5 = [];
let lista_filtrada = [];

function filtrar(){
    lista_filtrada = [];
    filtrarListaAlfa();
    filtrarLista2();
    filtrarLista3();
    filtrarLista4();
    filtrarLista5();
    // unirListas();
    mostrarResultado();
}

function filtrarListaAlfa(){
    let letra = letras[0].value;
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(0) === letra){
            listaAlfa.push(palabra);
            lista_filtrada.push(palabra);
        }
    });
}
function filtrarLista2(){
    letra = letras[1].value;
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(1) === letra){
            lista_2.push(palabra);
            lista_filtrada.push(palabra);
        }
    });
}
function filtrarLista3(){
    letra = letras[2].value;
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(2) === letra){
            lista_3.push(palabra);
            lista_filtrada.push(palabra);
        }
    });
}
function filtrarLista4(){
    letra = letras[3].value;
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(3) === letra){
            lista_4.push(palabra);
            lista_filtrada.push(palabra);
        }
    });
}
function filtrarLista5(){
    letra = letras[4].value;
    wordlerDB.forEach((palabra) => {
        if(palabra.charAt(4) === letra){
            lista_5.push(palabra);
            lista_filtrada.push(palabra);
        }
    });
}

function mostrarResultado(){
    
    limpiarResultados();

    let arreglo_no_duplicados = [...new Set(lista_filtrada)]
    arreglo_no_duplicados.forEach((palabra) =>{
        let li = document.createElement("li")
        result.appendChild(li);
        li.append(palabra);
    })
}

let limpiarResultados = () => {
   while(result.firstChild){
    result.removeChild(result.firstChild);
   }
}