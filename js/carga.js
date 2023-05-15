const inputs = document.querySelectorAll(".letra");
const candados = document.querySelectorAll(".candado"); 
const botonPpal = document.querySelector(".boton-buscar");
const deviceIsTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxtouchPoints > 0);
// inputs[0].focus();

window.onload = function() 
{
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
                if(index < inputs.length - 1){
                    inputs[index + 1].focus();
                }
            }else if(event.key === 'Backspace'){
               if(input.value === "" && index > 0){
                inputs[index - 1].focus();
               }
            }
        })
    });

}

if(deviceIsTouch){
    botonPpal.disabled = true;
};

inputs.forEach((input) =>{
    input.addEventListener('input', event =>{
        if(input.value.trim().length > 0){
            input.style.background = "var(--w-green)";
        }else{
            input.style.background = "white";
        }
    })
});