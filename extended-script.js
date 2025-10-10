const formCalculadora = document.getElementById('formCalculadora');
const divResultado = document.getElementById('resultado');
const divDicas = document.getElementById('dicas');

function calcularConsumo(potenciaWatts, horasDiarias) {
  const consumoDiarioWh = potenciaWatts * horasDiarias;
  const consumoMensalWh = consumoDiarioWh * 30;
  return +(consumoMensalWh / 1000).toFixed(2);
}

function calcularCusto(consumoKwh, tarifa) {
  return +(consumoKwh * tarifa).toFixed(2);
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

formCalculadora.addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeAparelho = document.getElementById('nomeAparelho').value.trim();
  const potencia = parseInt(document.getElementById('potencia').value);
  const horas = parseFloat(document.getElementById('horas').value);
  const tarifa = parseFloat(document.getElementById('tarifa').value);

  if (!nomeAparelho || !potencia || !horas || !tarifa) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }
  if (horas < 0 || horas > 24) {
    alert('Informe um tempo de uso diário válido entre 0 e 24 horas.');
    return;
  }
  if (tarifa < 0) {
    alert('Informe uma tarifa válida (maior ou igual a zero).');
    return;
  }

  const consumo = calcularConsumo(potencia, horas);
  const custo = calcularCusto(consumo, tarifa);

  divResultado.style.display = 'block';
  divResultado.innerHTML = `O consumo mensal estimado do aparelho <strong>${nomeAparelho}</strong> é de <strong>${consumo} kWh</strong> e o custo será aproximadamente <strong>R$ ${custo.toFixed(2)}</strong>.`;

  gerarDicas(nomeAparelho, potencia, horas);

  formCalculadora.reset();
});
