// script.js
let dataAtual = new Date();
let anotacoes = {};

function gerarCalendario(mes, ano) {
  const diasContainer = document.getElementById("dias");
  const diasSemana = document.getElementById("dias-semana");
  const mesAno = document.getElementById("mes-ano");
  const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  mesAno.textContent = `${nomesMeses[mes]} ${ano}`;
  diasContainer.innerHTML = "";
  diasSemana.innerHTML = diasDaSemana.map(d => `<div>${d}</div>`).join("");

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiroDia; i++) {
    diasContainer.innerHTML += `<div></div>`;
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const dataStr = `${ano}-${mes + 1}-${dia}`;
    diasContainer.innerHTML += `<div onclick="selecionarDia('${dataStr}')">${dia}</div>`;
  }
}

function mudarMes(delta) {
  dataAtual.setMonth(dataAtual.getMonth() + delta);
  gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
}

function selecionarDia(dataStr) {
  document.getElementById("data-selecionada").textContent = dataStr;
  document.getElementById("texto-anotacao").value = anotacoes[dataStr] || "";
}

function salvarAnotacao() {
  const data = document.getElementById("data-selecionada").textContent;
  const texto = document.getElementById("texto-anotacao").value;
  anotacoes[data] = texto;
  alert("Anotação salva!");
}

gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
