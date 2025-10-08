const form = document.getElementById('simulatorForm');
const resultDiv = document.getElementById('result');

function calculateConsumption(powerWatts, dailyHours) {
  const dailyConsumptionWh = powerWatts * dailyHours;
  const monthlyConsumptionWh = dailyConsumptionWh * 30;
  const monthlyConsumptionKWh = monthlyConsumptionWh / 1000;
  return monthlyConsumptionKWh.toFixed(2);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const room = document.getElementById('room').value;
  const appliance = document.getElementById('appliance').value;
  const power = parseInt(document.getElementById('power').value);
  const hours = parseFloat(document.getElementById('hours').value);

  if (!room || !appliance || !power || !hours) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  if (hours < 0 || hours > 24) {
    alert('Informe um tempo de uso diário válido entre 0 e 24 horas.');
    return;
  }

  const consumption = calculateConsumption(power, hours);

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    O consumo mensal estimado do aparelho <strong>${appliance}</strong> no cômodo <strong>${room}</strong> é de <strong>${consumption} kWh</strong>.
  `;
});