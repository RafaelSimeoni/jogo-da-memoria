let coresSorteadas = []
let coresClicadas = []
let podeClicar = false
let pontuacao = 0
let atualizarPontuacao

const botaoAzul = document.querySelector('.azul')
const botaoAmarelo = document.querySelector('.amarelo')
const botaoVermelho = document.querySelector('.vermelho')
const botaoVerde = document.querySelector('.verde')

const btnIniciarJogo = document.querySelector('.btn-iniciar-jogo')
const tituloJogo = document.querySelector('.titulo-jogo')

function iniciarJogo() {
    coresSorteadas = []
    coresClicadas = []
    pontuacao = 0
    tituloJogo.innerHTML = `Jogo da memória!`
    btnIniciarJogo.style.display = 'none'

    exibirPontuacao()
    sortearCor()
}

const contadorDePontos = document.querySelector('.pontuacao')
function exibirPontuacao() {
    contadorDePontos.style.display = 'block'
    atualizarPontuacao = setInterval(() => {
        contadorDePontos.innerHTML = `Pontuação: ${pontuacao}`
    }, 500);
}

function sortearCor() {
    coresClicadas = []

    let corSorteada = Math.floor(Math.random() * 4)
    switch (corSorteada) {
        case 0:
            coresSorteadas.push('azul')
            break
        case 1:
            coresSorteadas.push('amarelo')
            break
        case 2:
            coresSorteadas.push('vermelho')
            break
        case 3:
            coresSorteadas.push('verde')
            break
    }

    //piscar todas as cores sorteadas
    for (let i in coresSorteadas) {
        piscarCoresSorteadas(coresSorteadas[i], Number(i) + 1.5)
    }

    //Detectar cliques do jogador só após piscar todas as cores
    setTimeout(() => {
        detectarCliques(true)
    }, coresSorteadas.length * 1000 + 500);
}

function piscarCoresSorteadas(botaoSorteado, tempoParaPiscar) {
    tempoParaPiscar *= 1000
    switch (botaoSorteado) {
        case 'azul':
            botaoSorteado = botaoAzul
            break
        case 'amarelo':
            botaoSorteado = botaoAmarelo
            break
        case 'vermelho':
            botaoSorteado = botaoVermelho
            break
        case 'verde':
            botaoSorteado = botaoVerde
            break
    }

    setTimeout(() => {
        botaoSorteado.style.opacity = '1'
    }, tempoParaPiscar - 600)
    setTimeout(() => {
        botaoSorteado.style.opacity = '0.3'
    }, tempoParaPiscar - 200);
}

function detectarCliques(podeClicar) {
    if (podeClicar === true) {
        botaoAzul.onclick = () => {
            piscarCorClicada(botaoAzul)
            coresClicadas.push('azul')
            verificarAcertos()
        }
        botaoAmarelo.onclick = () => {
            piscarCorClicada(botaoAmarelo)
            coresClicadas.push('amarelo')
            verificarAcertos()
        }
        botaoVermelho.onclick = () => {
            piscarCorClicada(botaoVermelho)
            coresClicadas.push('vermelho')
            verificarAcertos()
        }
        botaoVerde.onclick = () => {
            piscarCorClicada(botaoVerde)
            coresClicadas.push('verde')
            verificarAcertos()
        }
    } else if (podeClicar === false) {
        botaoAzul.onclick = null
        botaoAmarelo.onclick = null
        botaoVermelho.onclick = null
        botaoVerde.onclick = null
    }
}

function piscarCorClicada(corClicada) {
    setTimeout(() => {
        corClicada.style.opacity = '1'
    }, 0)
    setTimeout(() => {
        corClicada.style.opacity = '0.3'
    }, 200)
}

let verificarAcertos = () => {
    for (let i in coresClicadas) {
        if (coresClicadas[i] != coresSorteadas[i]) {
            //Game Over
            detectarCliques(false)
            finalizarJogo()
            return
        } else if (coresClicadas.length == Number(i) + 1 && coresClicadas.length == coresSorteadas.length) {
            //Próximo nível
            pontuacao++
            detectarCliques(false)
            sortearCor()
        }
    }
}

function finalizarJogo() {
    tituloJogo.innerHTML = `Fim de Jogo!`
    
    clearInterval(atualizarPontuacao)
    contadorDePontos.innerHTML = `Sua pontuação final foi: ${pontuacao}`

    btnIniciarJogo.style.display = 'inline-block'
    btnIniciarJogo.innerText = 'Jogar novamente'
}






