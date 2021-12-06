//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//variables para campos de llenado
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



eventListeners();
function eventListeners() {
    //carga contenido de la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //enviar un email
    formulario.addEventListener('submit', enviarEmail);

    //boton para reiniciar el formulario
    btnReset.addEventListener('click', resetearFormulario);
    
}



//funciones
function iniciarApp() {
    // console.log('iniciar app...');
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');// error tailwind
}

//validar el formulario
function validarFormulario(e) {

    // console.log(e.target.type);

    if (e.target.value.length > 0) {
        // console.log('si hay algo');

        //elimina msj de error

        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        // e.target.style.borderBottomColor = 'red';
        // e.target.classList.add('error');
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email') {
        

        // console.log('es email hay que validarlo');
        // const resultado = e.target.value.indexOf('@');
        // console.log(resultado);
        // if (resultado - 0) {
        //     mostrarError('el email no es valido');
        // }
        if (expresionRegular.test(e.target.value)) {
            // console.log('email valido');
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
             e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

             mostrarError('email no valido');
        }

    }

    if (expresionRegular.test(email.value) !== '' && asunto.value !== '' && mensaje.value) {
        console.log('pasaste la validacion...');
        btnEnviar.disabled = false;
        // btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        console.log('hay campos por validar..');
    }
}
function mostrarError(mensaje) {
    // console.log('error....');

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10')); // ubicacion de msj
    }

    
}
//envia el email
function enviarEmail(e) {
    e.preventDefault();

    console.log('enviando.....');

    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex'

    //ocultar el spinner por temporizador metodo #1
    setTimeout( ()=> {
        console.log('esta funcion se ejecuta despues de 3 segundos');

        spinner.style.display = 'none'

        //mensaje que dice se envio correctamente

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente'

        //lugar donde vas a insertar el msj
        formulario.insertBefore(parrafo, spinner)
        // darle estilo al mensaje777en taillwind
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500','text-white')
       
        //crear tambien un temporizador para el msj
        setTimeout(() => {
            parrafo.remove(); //elimina el msj
            
            //llamando la funcion de reset
            resetearFormulario()
            console.log('mensaje borrado');
        }, 5000);


    },3000);

    //segudo metodo

    // setInterval(() => {
    //     console.log('se ejecuta por intervalos de 3 segundos');
    // }, 3000);

}
// resetar el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}