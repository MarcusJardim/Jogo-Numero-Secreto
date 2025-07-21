let listaDeNumerosSorteados = []
let dificuldade = 30;
let tentativas = 1;
let numeroSecreto = gerarNumero();
let titulo = document.querySelector('h1');
mensagemInicial();

function exibirTexto(tag, texto) {
  campo = document.querySelector(tag);
  campo.innerHTML = texto;
   if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
  exibirTexto('h1', 'Jogo do número secreto');
  exibirTexto('p', `Escolha um número de 1 a ${dificuldade}`);
}

function verificarChute() {
  let chute = document.querySelector('input').value;
  let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
  if(chute == numeroSecreto) {
    exibirTexto('h1', 'Parabéns!');
    exibirTexto('p', `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if(chute > numeroSecreto) {
      exibirTexto('h1', 'Você errou :(');
      exibirTexto('p', `O número secreto é menor que ${chute}`);
    } else {
        exibirTexto('h1', 'Você errou :(');
        exibirTexto('p', `O número secreto é maior que ${chute}`);
    }
    tentativas ++;
  }
}

function gerarNumero() {
  let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
  let quantidadeDeElementos = listaDeNumerosSorteados.length;
  if(quantidadeDeElementos == dificuldade) {
    listaDeNumerosSorteados = [];
    dificuldade++;
  }
  if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumero();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  mensagemInicial();
  numeroSecreto = gerarNumero();
  tentativas = 1;
  limparCampo();
  document.getElementById('reiniciar').setAttribute('disabled',true);
}