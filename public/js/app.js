console.log('Clint side javascript file loaded');

fetch('http://localhost:3000/weather?address=jaipur').then((response) => {
    response.json().then((data) => {
        if (!data.error) {
            console.log(data);
        } else {
            console.log('error : ' , data.error);
        }
    });
});

const weatherForm = document.querySelector('form');
const searchEle = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
messageOne.textContent = '';

const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchEle.value;
    console.log('testing', location);
    const url = 'http://localhost:3000/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                console.log(data.address);
                console.log(data.forecastData);
                console.log(data.location); 
                messageOne.textContent = 'location : ' + data.location;
                messageTwo.textContent = 'forecastData : ' + data.forecastData;
            } else {
                console.log('error : ', data.error);
                messageOne.textContent = data.error;
            }
        });
    });
});