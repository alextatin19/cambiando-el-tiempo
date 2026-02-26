let pantalla = document.getElementById("pantalla");
let primerValor = "";
let operacion = "";

function agregar(valor) {
    if (pantalla.textContent === "00:00") {
        pantalla.textContent = valor;
    } else {
        pantalla.textContent += valor;
    }
}

function limpiar() {
    pantalla.textContent = "00:00";
    primerValor = "";
    operacion = "";
}

function setOperacion(op) {
    if (pantalla.textContent === "") return;
    primerValor = pantalla.textContent;
    operacion = op;
    pantalla.textContent = "";
}

function calcular() {
    let segundoValor = pantalla.textContent;
    if (!primerValor || !segundoValor) return;

    let resultado;

    if (operacion === "-") {
        resultado = operarHoras(primerValor, segundoValor, "resta");
    } else if (operacion === "+") {
        resultado = operarHoras(primerValor, segundoValor, "suma");
    }

    pantalla.textContent = resultado;
    primerValor = "";
    operacion = "";
}

function operarHoras(hora1, hora2, tipo) {
    let [h1, m1] = hora1.split(":").map(Number);
    let [h2, m2] = hora2.split(":").map(Number);

    let total1 = h1 * 60 + m1;
    let total2 = h2 * 60 + m2;

    let resultadoMinutos =
        tipo === "resta" ? total1 - total2 : total1 + total2;

    let negativo = false;
    if (resultadoMinutos < 0) {
        negativo = true;
        resultadoMinutos = Math.abs(resultadoMinutos);
    }

    let horas = Math.floor(resultadoMinutos / 60);
    let minutos = resultadoMinutos % 60;

    return (negativo ? "-" : "") +
        String(horas).padStart(2, "0") +
        ":" +
        String(minutos).padStart(2, "0");
}