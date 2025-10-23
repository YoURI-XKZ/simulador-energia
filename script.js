const formSimulador = document.getElementById('formSimulador');
const divResultado = document.getElementById('resultado');
const divDicas = document.getElementById('dicas');

let dadosGraficoPizza = {};
let graficoPizza;
let graficoLinha;

function calcularConsumo(potenciaWatts, horasDiarias) {
  const consumoDiarioWh = potenciaWatts * horasDiarias;
  const consumoMensalWh = consumoDiarioWh * 30;
  return +(consumoMensalWh / 1000).toFixed(2);
}

function atualizarGraficoPizza() {
  if (!graficoPizza) {
    graficoPizza = new Chart(document.getElementById('graficoPizza').getContext('2d'), {
      type: 'pie',
      data: {
        labels: Object.keys(dadosGraficoPizza),
        datasets: [{
          label: 'Consumo por aparelho (kWh)',
          data: Object.values(dadosGraficoPizza),
          backgroundColor: [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1'
          ],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  } else {
    graficoPizza.data.labels = Object.keys(dadosGraficoPizza);
    graficoPizza.data.datasets[0].data = Object.values(dadosGraficoPizza);
    graficoPizza.update();
  }
}

function atualizarGraficoLinha() {
  const meses = ['Jun', 'Jul', 'Ago', 'Set', 'Out'];
  const dadosConsumo = [120, 110, 130, 125, 115];

  if (!graficoLinha) {
    graficoLinha = new Chart(document.getElementById('graficoLinha').getContext('2d'), {
      type: 'line',
      data: {
        labels: meses,
        datasets: [{
          label: 'Consumo mensal (kWh)',
          data: dadosConsumo,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    graficoLinha.update();
  }
}

function gerarDicas(nomeAparelho, potencia, horas) {
  const listaDicas = [];

  if (nomeAparelho.toLowerCase().includes('ar-condicionado') && horas > 1) {
    listaDicas.push(`Reduzir o uso do ar-condicionado em 30 minutos pode economizar até ${(potencia * 0.5 * 30 / 60 * 30 / 1000 * 0.7).toFixed(2)} kWh por mês.`);
  }

  if (potencia > 1000) {
    listaDicas.push("Equipamentos com potência alta consomem muito, considere reduzir o tempo de uso.");
  }

  if (listaDicas.length === 0) {
    listaDicas.push("Use a calculadora regularmente para monitorar seu consumo e identificar oportunidades de economia.");
  }

  divDicas.innerHTML = '<h3>Dicas Personalizadas</h3><ul>' + listaDicas.map(dica => `<li>${dica}</li>`).join('') + '</ul>';
}

formSimulador.addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeAparelho = document.getElementById('nomeAparelho').value.trim();
  const potencia = parseInt(document.getElementById('potencia').value);
  const horas = parseFloat(document.getElementById('horas').value);

  if (!nomeAparelho || !potencia || !horas) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }
  if (horas < 0 || horas > 24) {
    alert('Informe um tempo de uso diário válido entre 0 e 24 horas.');
    return;
  }

  const consumo = calcularConsumo(potencia, horas);

  divResultado.style.display = 'block';
  divResultado.innerHTML = `O consumo mensal estimado do aparelho <strong>${nomeAparelho}</strong> é de <strong>${consumo} kWh</strong>.`;

  if (nomeAparelho in dadosGraficoPizza) {
    dadosGraficoPizza[nomeAparelho] += consumo;
  } else {
    dadosGraficoPizza[nomeAparelho] = consumo;
  }

  atualizarGraficoPizza();
  atualizarGraficoLinha();
  gerarDicas(nomeAparelho, potencia, horas);

  formSimulador.reset();
});

atualizarGraficoLinha();
