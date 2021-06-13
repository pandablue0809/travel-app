import { dayCounter } from './counter'

function updateUICurrentWeather(apiObject, userInputDate){

    const apiForecastDates = apiObject['data'];
 
    try{

        for(const day of apiForecastDates){

            const apiDate = day['valid_date'];

            if(apiDate === userInputDate){

                const city = apiObject['city_name'];
                const country = apiObject['country_code'];
               
                const travelDay = function(){
                    const td = new Date(userInputDate);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const month = months[td.getMonth()];
                    const newDayFormat = `${month} ${td.getDate()}, ${td.getFullYear()}`;
                    return newDayFormat;
                };
                
                const sunriseUTC = day['sunrise_ts'];
                const sunrise = function(){
                    let sunriseUnixTimestamp = sunriseUTC * 1000;
                    const sunriseDate = new Date(sunriseUnixTimestamp);
                    const sunriseTime = sunriseDate.toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit', timeZone: `${apiObject['timezone']}`});
                    return sunriseTime;
                };
                
                const sunsetUTC = day["sunset_ts"];
                const sunset = function(){
                    let sunsetUnixTimestamp = sunsetUTC * 1000;
                    const sunsetDate = new Date(sunsetUnixTimestamp);
                    const sunsetTime = sunsetDate.toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit', timeZone: `${apiObject['timezone']}`});
                    return sunsetTime;
                };

                const daysAway = function(){

                    if(dayCounter(userInputDate) == 1){

                        const oneDay = `${dayCounter(userInputDate)} day away!`;
                        return oneDay;

                    } else {

                        const severalDays = `${dayCounter(userInputDate)} days away!`;
                        return severalDays;
                    }
                };

                document.getElementById('result-title').innerHTML = `My trip to: ${city}, ${country}`;
                document.getElementById('result-date').innerHTML = `Departing: ${travelDay(userInputDate)}`;
                document.getElementById('counter').innerHTML = `${city}, ${country} is ${daysAway()}`
                document.getElementById('result-subtitle').innerHTML = "Weather forecast for then is:";
                document.getElementById('low-temp').innerHTML = `Low: ${day["min_temp"]} °C`;
                document.getElementById('high-temp').innerHTML = `High: ${day["max_temp"]} °C`;
                document.getElementById('chance-of-rain').innerHTML = `Chance of Rain: ${day.pop}%`;
                document.getElementById('sunrise').innerHTML = `Sunrise: ${sunrise()}`;
                document.getElementById('sunset').innerHTML = `Sunset: ${sunset()}`;
                document.getElementById('explanation').innerHTML = `Weather description: ${day.weather.description}`;
            } 
        }

    } catch(error){
        console.log('Error when updating the UI', error);
    }
}

export { updateUICurrentWeather }