const inputs = document.querySelectorAll(".letra");
const candados = document.querySelectorAll(".candado"); 

window.onload = function()
{
    //debería poner el focus en el primer input, pero ni mergas.
    () => inputs[0].focus();

    // letras.forEach((campo)=>{campo.addEventListener('blur', (event)=>{event.target.style.background = "blue"})});

    candados.forEach((candado, index) => {
        candado.addEventListener('change', () =>{
            if(candado.checked){
                inputs[index].style.background = "green";
            }else{
                inputs[index].style.background = "white";
            }
        });
    })

    inputs.forEach((input) =>{
        input.addEventListener('keyup', () => {
            if(input.value === ""){
                input.style.background = "white";
            }else{
                input.style.background = "green";
            }
        })
    })
}