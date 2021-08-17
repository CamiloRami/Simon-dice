const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const botonEmpezar = document.getElementById("botonEmpezar");
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguieneNivel, 500)
    }

    inicializar() {
        this.siguieneNivel = this.siguieneNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBotonEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }  

    toggleBotonEmpezar() {
        if (botonEmpezar.classList.contains("hide")) {
            botonEmpezar.classList.remove("hide")
        } else {
            botonEmpezar.classList.add("hide")
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random(n) * 4))
    }

    siguieneNivel() {
        this.subnivel = 0
        this.iluminarSecuencia();
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return "celeste"
            case 1:
                return "violeta"
            case 2:
                return "naranja"
            case 3:
                return "verde"
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case "celeste":
                return 0
            case "violeta":
                return 1
            case "naranja":
                return 2
            case "verde":
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light")
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light")
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener("click", this.elegirColor)
        this.colores.violeta.addEventListener("click", this.elegirColor)
        this.colores.naranja.addEventListener("click", this.elegirColor)
        this.colores.verde.addEventListener("click", this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener("click", this.elegirColor)
        this.colores.violeta.removeEventListener("click", this.elegirColor)
        this.colores.naranja.removeEventListener("click", this.elegirColor)
        this.colores.verde.removeEventListener("click", this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganar()
                } else {
                    setTimeout(this.siguieneNivel, 1500)
                }
            }
        } else {
            this.perder()
        }
    }
    ganar() {
        swal("Felizitaciones!", "Has ganado el juego!", "success")
            .then(() => this.inicializar())
    }
    perder() {
        swal("Perdiste", "Suerte para la próxima", "error")
            .then(() => this.eliminarEventosClick())
            .then(() => this.inicializar())
    }
}

function empezarJuego() {
    window.juego = new Juego();
}

