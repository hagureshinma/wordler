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
let arreglos_usados = [];

function filtrar(){
    lista_filtrada = [];
    // arreglos_usados.length = 0;
    filtrarListaAlfa();
    filtrarLista2();
    filtrarLista3();
    filtrarLista4();
    filtrarLista5();
    mostrarResultado();
    // verificarListas();
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


function verificarListas (){
    // crear arreglo con la letra y posicion con los campos usados.
    let numero_palabras ={};
    let palabras_repetidas = [];
    arreglos_usados = [];
    lista_filtrada = [];
    letras.forEach((letra, index) =>{
        if(letra.value.length > 0){
            arreglos_usados.push([letra.value, index]);
        }
    });

    arreglos_usados.forEach((letra) =>{
        wordlerDB.forEach((palabra) =>{
            console.log(`letra ${letra[0]} en posicion ${letra[1]}`);
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

    console.log("arreglo final: " + palabras_repetidas.length);
    palabras_repetidas.forEach((palabra) =>{
        let li = document.createElement("li");
        result.appendChild(li);
        li.append(palabra);
    })
    // lista_filtrada.forEach((palabra) =>{
    //     let li = document.createElement("li");
    //     result.appendChild(li);
    //     li.append(palabra);
    // })

    // mostrarResultado();
}

// function mostrarResultado(){
//     // del arreglo de listas usadas comparar
//     let resultado = [];
//     if(listaAlfa !== []){
//         resultado = listaAlfa.filter(value => lista_2.includes(value) && lista_3.includes(value) && lista_4.includes(value) && lista_5.includes(value) );
//     } else if(lista_2 !== []){
//         resultado = lista_2.filter(value => lista_3.includes(value) && lista_4.includes(value) && lista_5.includes(value));
//     } else if(lista_3 !== []){
//         resultado = lista_3.filter(value => lista_4.includes(value) && lista_5.includes(value));
//     }else if(lista_4 !== []){
//         resultado = lista_4.filter(value => lista_5.includes(value));
//     }else{
//         resultado = lista_5;
//     }

//     resultado.forEach((palabra) => {
//         let li = document.createElement("li")
//         result.appendChild(li);
//         li.append(palabra);
//     })

//     // debe haber una forma más fácil, pasando el número de listas usadas como valor a lista_filtrada y usarlo como cantidad de veces que la palabra se repite para limpiar mejor.
// }