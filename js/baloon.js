let timeId = null;

//selecionar dificuldade
function start() {
  let nivel = document.getElementById("dificuldade").value;

  window.location.href = "game.html?" + nivel;
}

function gameStart() {
  //Pega somente a parte da string fora da url original
  let url = window.location.search;

  let nv = url.replace("?", "");

  let segundos = 0;

  if (nv == 1) {
    segundos = 120;
  } else if (nv == 2) {
    segundos = 60;
  } else if ((nv = 3)) {
    segundos = 30;
  } else {
    return false;
  }

  //Colocando time
  document.getElementById("cronometro").innerHTML = segundos;

  //Qtd baloon
  let qtdBalao = 80;

  criaBalao(qtdBalao);

  //print baloon
  document.getElementById("baloesInteiros").innerHTML = qtdBalao;
  document.getElementById("baloesEstourados").innerHTML = 0;

  tempo(segundos + 1);
}

function tempo(segundos) {
  segundos -= 1;

  if (segundos == -1) {
    clearTimeout(timerId); //para a execução da funcao do setTimeOut
    gameOver();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;
  timerID = setTimeout("tempo(" + segundos + ")", 1000);
}

function criaBalao(qtdBalao) {
  for (let i = 1; i <= qtdBalao; i++) {
    let balao = document.createElement("img");
    balao.src = "./img/balao_azul_pequeno.png";
    balao.style.margin = "10px";
    balao.id = "b" + i;

    balao.onclick = function () {
      estourar(this);
    };

    document.getElementById("cenario").appendChild(balao);
  }
}

//estourando baloes
function estourar(e) {
  let idBalao = e.id;
  document.getElementById(idBalao).setAttribute("onclick", "");

  document.getElementById(idBalao).src = "./img/balao_azul_pequeno_estourado.png";

  pontuacao(-1);
}

//Pontuação
function pontuacao(acao) {
  let balao_inteiro = document.getElementById("baloesInteiros").innerHTML;
  let balao_estourado = document.getElementById("baloesEstourados").innerHTML;

  balao_inteiro = parseInt(balao_inteiro);
  balao_estourado = parseInt(balao_estourado);

  balao_inteiro += acao;
  balao_estourado -= acao;

  document.getElementById("baloesInteiros").innerHTML = balao_inteiro;
  document.getElementById("baloesEstourados").innerHTML = balao_estourado;

  situacao(balao_inteiro);
}

//situacao do game
function situacao(baloesInteiros) {
  if (baloesInteiros == 0) {
    alert("Parabéns, você conseguiu estourar todos os balões a tempo.");
    parar();
  }
}

//Removendo eventos extras
function removendoEventos() {
  let i = 1;

  while (document.getElementById("b" + i)) {
    document.getElementById("b" + i).onclick = "";
    i++;
  }
}

//parando o TimeOut
function parar() {
  clearTimeout(timerID);
}

//End game
function gameOver() {
  removendoEventos();
  alert("Fim de jogo, tente novamente");
}
