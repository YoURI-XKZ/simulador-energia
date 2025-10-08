const form = document.getElementById('energyForm');
const resultDiv = document.getElementById('result');

function calculateCost(wattage, hours, pricePerKwh) {
  const dailyConsumptionWh = wattage * hours;
  const monthlyConsumptionKWh = (dailyConsumptionWh * 30) / 1000;
  const cost = monthlyConsumptionKWh * pricePerKwh;
  return {
    consumption: monthlyConsumptionKWh.toFixed(2),
    cost: cost.toFixed(2),
  };
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const appliance = document.getElementById('appliance').value;
  const wattage = parseFloat(document.getElementById('wattage').value);
  const hours = parseFloat(document.getElementById('hours').value);
  const price = parseFloat(document.getElementById('price').value);

  if (!appliance || !wattage || !hours || !price) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  if (hours < 0 || hours > 24) {
    alert('Informe um tempo de uso diário válido entre 0 e 24 horas.');
    return;
  }

  const { consumption, cost } = calculateCost(wattage, hours, price);

  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    O consumo mensal estimado do aparelho <strong>${appliance}</strong> é de <strong>${consumption} kWh</strong>.<br/>
    O custo mensal estimado da energia é <strong>R$ ${cost}</strong>.
  `;
});