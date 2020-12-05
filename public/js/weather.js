const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weather.addEventListener('submit',(e)=>{
    messageTwo.innerHTML=`<div class="spinner-grow" role="status">
    <span class="sr-only">Loading...</span>
  </div>`

    e.preventDefault()
    fetch('http://localhost:3000/weather?search='+search.value).then(response=>{
    response.json().then(data=>{
        if(data.error){
             console.log(data.error);
             messageTwo.innerHTML=`<h4 class='display-4' >${data.error}</h4>`
        }
        else{
            console.log(data);
            document.getElementById("message-2").innerHTML  = `<div class="d-flex justify-content-center ">
            <div class="card border border-c" style="width: 18rem;">
                <div class="card-body bg-color">
                    <h5 class="card-title display-1 text-center">${data.forecast.temperature} <i class='fas fa-temperature-low'
                            style='font-size:36px'>C</i></h5>
                   <p> Feels like ${data.forecast.feelslike} degree. </p>
                   <p>${data.location.region},${data.location.country}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Wind speed  ${data.forecast.wind_speed} km/h</li>
                    <li class="list-group-item">Percipation  ${data.forecast.precip}%</li>
                    <li class="list-group-item">Humidity  ${data.forecast.humidity}%</li>
                    <li class="list-group-item">Recorded at  ${data.forecast.observation_time}</li>
                </ul>
            </div>
        </div>`


        }
    })
})
    console.log(search.value)
})