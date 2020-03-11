console.log('The app.js file is successfully linked.');

const weatherForm = document.querySelector('form');
const locationInput = document.querySelector('input');
const forecast = document.querySelector('#forecast');
const error = document.querySelector('#error');

const weatherURL = '/weather?location=';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(weatherURL + locationInput.value)
        .then((response) => {
            return response.json().then((data) => {
                if (data.forecast) {
                    forecast.textContent = data.forecast;
                } else {
                    forecast.textContent = data.error;
                }
            });
        })
})

