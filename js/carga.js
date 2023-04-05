const inputs = document.querySelectorAll(".letra");
const candados = document.querySelectorAll(".candado"); 

inputs[0].focus();

window.onload = function() 
{
    //debería poner el focus en el primer input, pero ni mergas.
    // () => inputs[0].focus(); // solucionado arriba

    // letras.forEach((campo)=>{campo.addEventListener('blur', (event)=>{event.target.style.background = "blue"})});

    // candados.forEach((candado, index) => {
    //     candado.addEventListener('change', () =>{
    //         if(candado.checked){
    //             inputs[index].style.background = "green";
    //         }else{
    //             inputs[index].style.background = "white";
    //         }
    //     });
    // })

    inputs.forEach((input, index) =>{
        input.addEventListener('keyup', event => {
            if(event.key.length === 1){
                input.style.background = "var(--w-green)";
                if(index < inputs.length - 1){
                    inputs[index + 1].focus();
                }
            }else if(event.key === 'Backspace'){
                input.style.background = "white";
               if(input.value === "" && index > 0){
                inputs[index - 1].focus();
               }
            }
        })
    });

    // inputs.forEach((input) =>{
    //     input.addEventListener('keyup', () => {
    //         if(input.value === ""){
    //             input.style.background = "white";
    //         }else{
    //             input.style.background = "var(--w-green)";
    //         }
    //     })
    // })
}