let ordemDasCores = []
let ordemDasCoresClicadas = []
let pontuacao = 0

const verde = document.querySelector('.verde')
const vermelho = document.querySelector('.vermelho')
const amarelo = document.querySelector('.amarelo')
const azul = document.querySelector('.azul')

//Cria Ordem aleatória de cores
let sortearCor = () => {
    let corSorteada = Math.floor(Math.random() * 4)
    ordemDasCores[ordemDasCores.length] = corSorteada
    ordemDasCoresClicadas = []

    for (let i in ordemDasCores) {
        let corCriada = criarCor
            (ordemDasCores[i])
        acenderCor(corCriada, Number(i) + 1)
    }
}

//Acende a próxima cor
let acenderCor = (elemento, numero) => {
    numero = numero * 900
    setTimeout(() => {
        elemento.classList.add('cor-selecionada')
    }, numero - 450)
    setTimeout(() => {
        elemento.classList.remove('cor-selecionada')
    }, numero + 200)
}

//Verifica os acertos dos cliques
let verificarAcertos = () => {
    for (let i in ordemDasCoresClicadas) {
        if (ordemDasCoresClicadas[i] != ordemDasCores[i]) {
            gameOver()
            break
        }
    }
    if (ordemDasCoresClicadas.length == ordemDasCores.length) {
        nivelSeguinte()
    }
}

//função para o clique do jogador
let verificarClique = (cor) => {
    ordemDasCoresClicadas[ordemDasCoresClicadas.length] = cor
    criarCor(cor).classList.add('.selecionado')

    setTimeout(() => {
        criarCor(cor).classList.remove('.selecionado')
        verificarAcertos()
    }, 250)

}

//Função que retorna a cor
let criarCor = (cor) => {
    if (cor == 0) {
        return verde
    } else if (cor == 1) {
        return vermelho
    } else if (cor == 2) {
        return amarelo
    } else if (cor == 3) {
        return azul
    }
}

//função para próximo nível de jogo

let nivelSeguinte = () => {
    pontuacao++
    sortearCor()
}

//Gameover

let gameOver = () => {
    alert(`Pontuação: ${pontuacao - 1}\nFim de jogo!\nClique em OK para iniciar um novo jogo`)
    ordemDasCores = []
    ordemDasCoresClicadas = []
    iniciarJogo()
}

let iniciarJogo = () => {
    document.querySelector('.botao').innerHTML = ''
    pontuacao = 0

    //Atualizar pontuação
    setInterval(() => {
        document.querySelector('.pontuacao').innerHTML = `Pontuação: ${pontuacao - 1}`
    }, 20)

    nivelSeguinte()
}

verde.onclick = () => {
    let campoVerde = document.querySelector('.verde')
    campoVerde.classList.add('cor-selecionada')
    setTimeout(() => {
        campoVerde.classList.remove('cor-selecionada')
    }, 200)
    verificarClique(0)
}
vermelho.onclick = () => {
    let campoVermelho = document.querySelector('.vermelho')
    campoVermelho.classList.add('cor-selecionada')
    setTimeout(() => {
        campoVermelho.classList.remove('cor-selecionada')
    }, 200)
    verificarClique(1)
}
amarelo.onclick = () => {
    let campoAmarelo = document.querySelector('.amarelo')
    campoAmarelo.classList.add('cor-selecionada')
    setTimeout(() => {
        campoAmarelo.classList.remove('cor-selecionada')
    }, 200)
    verificarClique(2)
}
azul.onclick = () => {
    let campoAzul = document.querySelector('.azul')
    campoAzul.classList.add('cor-selecionada')
    setTimeout(() => {
        campoAzul.classList.remove('cor-selecionada')
    }, 200)
    verificarClique(3)
}

