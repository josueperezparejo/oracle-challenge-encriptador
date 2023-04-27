// Variables & Selectores
const textArea = document.querySelector('#floatingTextarea');
const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDesencriptar = document.querySelector('#btnDesencriptar');
const inputResultado = document.querySelector('.input-resultado');
const formulario = document.querySelector('.formulario')
let resultado

// Eventos
iniciarApp()
function iniciarApp() {
    btnEncriptar.addEventListener('click', () => {
        resultado = encriptador(textArea.value.toLowerCase())
        spinner()
        setTimeout(() => {
            mostrarAlerta(resultado)
        }, 2000);
        textArea.value = ''
    })

    btnDesencriptar.addEventListener('click', () => {
        resultado = desencriptador(textArea.value.toLowerCase())
        spinner()
        setTimeout(() => {
            mostrarAlerta(resultado)
        }, 2000);
        textArea.value = ''
    })
}

// Funciones
function encriptador(palabra) {
    palabra = palabra.replace(/e/g, "enter");
    palabra = palabra.replace(/i/g, "imes");
    palabra = palabra.replace(/a/g, "ai");
    palabra = palabra.replace(/o/g, "ober");
    palabra = palabra.replace(/u/g, "ufat");

    return palabra
}

function desencriptador(palabra) {
    palabra = palabra.replace(/enter/g, "e");
    palabra = palabra.replace(/imes/g, "i");
    palabra = palabra.replace(/ai/g, "a");
    palabra = palabra.replace(/ober/g, "o");
    palabra = palabra.replace(/ufat/g, "u");

    return palabra
}

function mostrarAlerta(resultado) {

    if (resultado == '') {
        inputResultado.innerHTML = `
            <div>
                <img src="assets/ilustracion.svg" alt="ilustracion">
                <h2 class="text-center">Ningún mensaje fue encontrado</h2>
                <p class="text-center">Ingresa el texto que desees encriptar o desencriptar.</p>
            </div>
        `
    } else {
        inputResultado.innerHTML = `
            <div class="resultadoBox text-center">
                <img src="assets/encripted.png" alt="encripted" width="150px">
                <h2 class="text-center">Resultado 🔐</h2>
                <p class="border border-success rounded text-center fw-normal inputResult">${resultado}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button id="btnCopiar" type="button" class="btn btn-sm btn-outline-success btn-lg px-4">Copiar</button>
                </div>
            </div>
            `

        const btnCopiar = document.querySelector('#btnCopiar');

        btnCopiar.addEventListener('click', () => {
            const resultado = document.querySelector('.inputResult').textContent
            const resultadoBox = document.querySelector('.resultadoBox')
            const mensaje = document.createElement('p')

            const alertaActiva = document.querySelector('.alertaActiva')
            if(!alertaActiva) {
                mensaje.textContent = 'Copiado Correctamente'
                mensaje.classList.add('alert', 'alert-success', 'text-center', 'mt-4', 'alertaActiva')
            }

            resultadoBox.appendChild(mensaje)

            setTimeout(() => {
                mensaje.remove()
            }, 2000);
            copiarTexto(resultado)
        })
    }
}

function spinner() {
    const activo = document.querySelector('.sk-chase')
    if (!activo) {
        const spinner = document.createElement('div')
        spinner.classList.add('sk-chase', 'mx-auto', 'mt-4')
        spinner.innerHTML = `
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        `

        const resultadoBox = document.querySelector('.resultadoBox')
        resultadoBox.innerHTML = `
            <div class="text-center">
                <img src="assets/loading.png" alt="loading" width="150px">
            </div>
            <p class="text-center fw-bold">Cargando...</p>
        `

        formulario.appendChild(spinner)
        setTimeout(() => {
            spinner.remove()
        }, 2000);
    }
}

async function copiarTexto(texto) {
    try {
        await navigator.clipboard.writeText(texto);
    } catch (error) {
        console.error('Error al copiar el texto:', error);
    }
}