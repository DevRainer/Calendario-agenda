// script.js
let dataAtual = new Date();
let anotacoes = {};

function gerarCalendario(mes, ano) {
  const diasContainer = document.getElementById("dias");
  const diasSemana = document.getElementById("dias-semana");
  const mesAno = document.getElementById("mes-ano");
  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  mesAno.textContent = `${nomesMeses[mes]} ${ano}`;
  diasContainer.innerHTML = "";
  diasSemana.innerHTML = diasDaSemana.map((d) => `<div>${d}</div>`).join("");

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < primeiroDia; i++) {
    diasContainer.innerHTML += `<div></div>`;
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const dataStr = `${ano}-${mes + 1}-${dia}`;
    const ehHoje =
      dia === new Date().getDate() &&
      mes === new Date().getMonth() &&
      ano === new Date().getFullYear();
    const classeHoje = ehHoje ? " hoje" : "";
    diasContainer.innerHTML += `<div class="dia${classeHoje}" onclick="selecionarDia('${dataStr}')">${dia}</div>`;
  }
}

function mudarMes(delta) {
  dataAtual.setMonth(dataAtual.getMonth() + delta);
  gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
}

function selecionarDia(dataStr) {
  document.getElementById("data-selecionada").textContent = dataStr;
  const agendaHorarios = document.getElementById("agenda-horarios");
  const anotacoesDoDia = anotacoes[dataStr] || {};

  agendaHorarios.innerHTML = Array.from({ length: 24 }, (_, hora) => {
    const horario = `${String(hora).padStart(2, "0")}:00`;
    const anotacao = anotacoesDoDia[horario] || "";
    return `
      <div class="linha-horario">
        <label for="hora-${hora}">${horario}</label>
        <textarea id="hora-${hora}" data-horario="${horario}" placeholder="Adicionar anotação..."></textarea>
      </div>`;
  }).join("");

  Object.entries(anotacoesDoDia).forEach(([horario, anotacao]) => {
    const campo = document.querySelector(`[data-horario="${horario}"]`);
    if (campo) campo.value = anotacao;
  });
}

function salvarAnotacao() {
  const data = document.getElementById("data-selecionada").textContent;
  const anotacoesDoDia = {};

  document.querySelectorAll("#agenda-horarios textarea").forEach((campo) => {
    if (campo.value.trim()) {
      anotacoesDoDia[campo.dataset.horario] = campo.value;
    }
  });

  anotacoes[data] = anotacoesDoDia;
  alert("Anotação salva!");
}

gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
selecionarDia(`${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${dataAtual.getDate()}`);
