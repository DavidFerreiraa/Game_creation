//Códigos de teclas
let SETA_DIREITA = 39;
let SETA_ESQUERDA = 37;
let SETA_BAIXO = 40;
let SETA_CIMA = 38;
let TECLA_W = 87;
let TECLA_A = 65;
let TECLA_S = 83;
let TECLA_D = 68;

//Classe responsável pelos comandos do teclado
class Teclado {
    constructor(elemento) {
        this.elemento = elemento;
        //Array das teclas pressionadas
        this.pressionadas = [];
        //Registrando os estados das teclas no Array
        let teclado = this;
        elemento.addEventListener('keydown', function (evento) {
            teclado.pressionadas[evento.keyCode] = true;
        });
        elemento.addEventListener('keyup', function (evento) {
            teclado.pressionadas[evento.keyCode] = false;
        });
    }
    pressionada(tecla) {
        return this.pressionadas[tecla];
    }
}

//Referências do canvas
let canvas_2 = document.querySelector('#Canvas-2');
let context_2 = canvas_2.getContext('2d');

//Posição inicial do personagem
let positionx = 0;
let positiony = 100;
desenharPersonagem();
const teclado = new Teclado(document);
requestAnimationFrame(animar);

//Função responsável por animar o personagem
function animar(){
    if (teclado.pressionada(SETA_ESQUERDA)){
        positionx -= 10;
    }
    else if (teclado.pressionada(SETA_DIREITA)){
        positionx += 10;
    }
    else if(teclado.pressionada(SETA_CIMA)){
        positiony -= 10;
    }
    else if(teclado.pressionada(SETA_BAIXO)){
        positiony += 10;
    }
    else if (teclado.pressionada(TECLA_A)){
        positionx -= 10;
    }
    else if (teclado.pressionada(TECLA_D)){
        positionx += 10;
    }
    else if(teclado.pressionada(TECLA_W)){
        positiony -= 10;
    }
    else if(teclado.pressionada(TECLA_S)){
        positiony += 10;
    }

    desenharPersonagem();
    requestAnimationFrame(animar);
}

//Função responsável por desenhar o personagem
function desenharPersonagem(){
    context_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
    context_2.fillRect(positionx, positiony, 20, 50);
}
