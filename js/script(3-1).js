//Referências do canvas
let canvas_1 = document.querySelector('#Canvas-1');
let context = canvas_1.getContext('2d');

//Função responsável por desenhar o personagem na tela
function desenharPersonagem() {
    context.clearRect(0, 0, canvas_1.width, canvas_1.height);
    context.fillRect(positionx, positiony, 20, 50);
}

//Posição inicial do personagem
let positionx = 0;
let positiony = 100;
desenharPersonagem();

document.addEventListener('keydown', function(evento) {
    if (evento.keyCode == 37) { //seta para a esquerda
        positionx -= 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 39) { //Seta para a direita
        positionx += 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 38) { //Seta para cima
        positiony -= 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 40) { //Seta para baixo
        positiony += 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 87) { //(W) para cima
        positiony -= 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 83) { //(S) para baixo
        positiony += 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 68) { //(D) para a direita
        positionx += 10;
        desenharPersonagem();
    }
    else if (evento.keyCode == 65) { //(A) para a esquerda
        positionx -= 10;
        desenharPersonagem();
    }
})