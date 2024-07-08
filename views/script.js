document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const response = await fetch(`/weather/${city}`);
    const data = await response.json();
    const resultDiv = document.getElementById('weather-result');
    if (response.ok) {
        resultDiv.innerHTML = `<h2>${data.city}</h2><p>${data.temperature} °C</p><p>${data.description}</p>`;
    } else {
        resultDiv.innerHTML = `<p>${data.message}</p>`;
    }
});