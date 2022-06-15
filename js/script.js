//Referências do canvas
let canvas_1 = document.querySelector('#Canvas-1');
let context = canvas_1.getContext('2d');

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
    else if (evento.keyCode == 40) { //Seta para cima
        positiony += 10;
        desenharPersonagem();
    }
function desenharPersonagem() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    contexst.fillRect(positionx, positiony, 20, 50)
}
})