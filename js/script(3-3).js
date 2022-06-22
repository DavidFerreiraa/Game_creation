//Códigos de teclas
let SETA_DIREITA = 39;
let SETA_ESQUERDA = 37;
let SETA_BAIXO = 40;
let SETA_CIMA = 38;
let TECLA_W = 87;
let TECLA_A = 65;
let TECLA_S = 83;
let TECLA_D = 68;
let ESPACO = 32;

//Classe responsável pelos tiros(bolas)
class Bola {
    constructor(context) {
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.velocidadeX = 0;
        this.velocidadeY = 0;

        this.cor = 'green';
        this.raio = 10;
    }

    atualizar() {
        let ctx = this.context;

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    desenhar() {
        let ctx = this.context;

        ctx.save();

        ctx.fillStyle = this.cor;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.restore();
    }
}

//Classe responsável pela animação
class Animacao {
    constructor(context) {
        this.context = context;
        this.sprites = [];
        this.ligado = false;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
    }

    ligar() {
        this.ligado = true;
        this.proximoFrame();
    }

    desligar() {
        this.ligado = false;
    }

    proximoFrame() {

        if (!this.ligado)
            return;

        this.limparTela();
        
        for (let i in this.sprites)
            this.sprites[i].atualizar();

        for (let i in this.sprites)
            this.sprites[i].desenhar();

        let animacao = this;
        requestAnimationFrame(function () {
            animacao.proximoFrame();
        });
    }

    limparTela() {
        let ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

//Classe responsável pelos comandos do herói
class Heroi {
    constructor(context, teclado, animacao) {
        this.context = context;
        this.teclado = teclado;
        this.animacao = animacao;
        this.x = 0;
        this.y = 0;
    }
    atualizar(){
        if (this.teclado.pressionada[SETA_ESQUERDA] && this.x > 0) {
            this.x -= 10;
        }
        else if (this.teclado.pressionada[SETA_DIREITA] && this.x < this.context.canvas.width - 20) {
            this.x += 10;
        }
        else if (this.teclado.pressionada[SETA_CIMA] && this.y > 0) {
            this.y -= 10;
        }
        else if (this.teclado.pressionada[SETA_BAIXO] && this.y < this.context.canvas.height - 20) {
            this.y += 10;
        }
        if (this.teclado.pressionada[TECLA_A] && this.x > 0) {
            this.x -= 10;
        }
        else if (this.teclado.pressionada[TECLA_D] && this.x < this.context.canvas.width - 20) {
            this.x += 10;
        }
        else if (this.teclado.pressionada[TECLA_W] && this.y > 0) {
            this.y -= 10;
        }
        else if (this.teclado.pressionada[TECLA_S] && this.y < this.context.canvas.height - 20) {
            this.y += 10;
        }
    }
    desenhar(){
        this.context.fillRect(this.x, this.y, 20, 50);
    }
    atirar(){
        let tiro = new Bola(this.context);
        tiro.x = this.x + 10;
        tiro.y = this.y + 10;
        tiro.raio = 2;
        tiro.cor = 'red';

        if (this.teclado.pressionada[SETA_ESQUERDA] || this.teclado.pressionada[TECLA_A]){
            tiro.velocidadeX = -20;
        } else {
            tiro.velocidadeX = 20;
        }
        console.log(tiro)
        this.animacao.novoSprite(tiro);
    }
}

//Classe responsável pelos comandos do teclado
class Teclado {
    constructor(elemento) {
        this.elemento = elemento;
        //Array das teclas pressionadas
        this.pressionadas = [];
        //Array de teclas disparadas
        this.disparadas = [];
        //Funções de disparo
        this.funcoesDisparo = [];
        //Registrando os estados das teclas no Array
        let teclado = this;
        elemento.addEventListener('keydown', function (evento) {
            let tecla = evento.keyCode;
            teclado.pressionadas[tecla] = true;
            if (teclado.funcoesDisparo[tecla] && ! teclado.disparadas[tecla]) {
                teclado.disparadas[tecla] = true;
                teclado.funcoesDisparo[tecla] () ;
            }
        });

        elemento.addEventListener('keyup', function (evento) {
            teclado.pressionadas[evento.keyCode] = false;
            teclado.disparadas[evento.keyCode] = false;
        });
    }
    pressionada(tecla) {
        return this.pressionadas[tecla];
    }
    disparou(tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }
}

//Referências do canvas
let canvas_3 = document.querySelector('#Canvas-3');
let context_3 = canvas_3.getContext('2d');

//Posição inicial do personagem
let positionx = 0;
let positiony = 100;
desenharPersonagem();

const teclado = new Teclado(document);

const animacao = new Animacao(context_3);

const heroi = new Heroi(context_3, teclado);
heroi.x = 0;
heroi.y = 100;

animacao.novoSprite(heroi);

teclado.disparou(ESPACO, () => {
    heroi.atirar();
})

animacao.ligar();

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
    context_3.clearRect(0, 0, canvas_3.width, canvas_3.height);
    context_3.fillRect(positionx, positiony, 20, 50);
}
