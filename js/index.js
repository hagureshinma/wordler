// import { filtrarLista1 } from "./filtrar";
let result = document.querySelector(".result");
let letras = document.querySelectorAll(".letra");
const candados = document.querySelectorAll(".candado"); 

// function concatenar()
// {
//     result.textContent = "";
//     // let nuevaPalabra = [];
//     let nuevaPalabra = letras.forEach(function(letra){
//         // nuevaPalabra.push(letra.value);
//         if(letra.value === ""){
//             result.textContent += " ";
//         }
//         result.textContent += letra.value;
//     });
// }

let concatenar = () =>
{
    result.textContent = "";
    let nuevaPalabra = letras.forEach((letra) => {
        if(letra.value === ""){
            result.textContent += " ";
        }
        result.textContent += letra.value;
    });
}


// let concatenar = () => letras.forEach( (letra)=> result.textContent += letra.value);

// arreglo temporal para pruebas, debe ser reemplazado por una base de datos.
const definiciones = ["amigo", "hello", "first", "third", "party", "entry", "choir", "deter", "cabin", "baker", "biome", "drive"];
let lista_filtrada = [];
let cadena_comparativa = [];

function filtrar(){
    cadena_comparativa = [];
    lista_filtrada = [];

    letras.forEach((letra, index) => {
        // cadena_comparativa.push(index, letra.value);

        if (letra.value !== ""){
            buscar(letra.value, index);
        }

        // definiciones.forEach((palabra) =>{
        //     if(palabra.includes(letra.value, index)){
        //         lista_filtrada.push(palabra);
        //     };
            
        // })
    });
    // console.log(lista_filtrada);
    // console.log(cadena_comparativa);
    
}

function buscar(letra, index){
    definiciones.forEach((palabra) => {
        if(palabra.charAt(index) === letra){
            lista_filtrada.push(palabra);

            console.log(`Letra ${letra} en index ${index}`)
        }
    })
    mostrarResultado();
    console.log(`Lista filtrada = ${lista_filtrada}`);
}

function mostrarResultado(){
    lista_filtrada.forEach((palabra) =>{
        let li = document.createElement("li")
        result.appendChild(li);
        li.append(palabra);
    })
}