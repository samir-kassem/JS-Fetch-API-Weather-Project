const api_key = '7e67dc1c8e3c39ce2512c7707351b3c9';
const base = 'https://api.openweathermap.org/data/2.5/weather?';


// DOM elements

const icon_img = document.querySelector('#weather_icon'); 
const loc = document.querySelector('#location'); 
const temp_c = document.querySelector('.c'); 
const temp_f = document.querySelector('.f'); 
const desc = document.querySelector('.desc'); 
const sunrise_dom = document.querySelector('.sunrise'); 
const sunset_dom = document.querySelector('.sunset'); 


window.addEventListener('load', () => {
    let lat, long;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let url = base + `lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
            
            fetch(url)
            .then(response => response.json())
            .then(json_response => {
                const {temp} = json_response.main;
                const place = json_response.name;
                const {description, icon} = json_response.weather[0];
                const {sunrise, sunset} = json_response.sys;
                
                const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit = (temp * 9) / 5 + 32;
                
                
                // epoch to gmt
                const sunrise_gmt = new Date(sunrise * 1000);
                const sunset_gmt = new Date(sunset * 1000);
                
                
                icon_img.src = icon_url;
                loc.textContent = place;
                desc.textContent = description;
                temp_c.textContent = `${temp.toFixed(2)} C`;
                temp_f.textContent = `${fahrenheit.toFixed(2)} F`;
                
                sunrise_dom.textContent = `${sunrise_gmt.toLocaleDateString()}, ${sunrise_gmt.toLocaleTimeString()}`;
                
                sunset_dom.textContent = `${sunset_gmt.toLocaleDateString()}, ${sunset_gmt.toLocaleTimeString()}`;
            })
        })
    }
})

























