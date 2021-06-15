//Importing helper functions
import { encodeUrl } from './urlEncoder'
import { getCoordinatesFromApi } from './callGeonamesApi'
import { callApiViaServerSide } from './postRequestToServer'
import { dayCounter } from './counter'
import { updateUICurrentWeather } from './updateUICurrentW'
import { validateForm } from './formValidator'

//Primary Object to hold data from GeoNames API
var primaryData = {};

//* APIs keys *//
const geoNamesBaseURL = 'http://api.geonames.org/searchJSON?q='
const geoNamesKey = 'janainamj'
const weatherBitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherBitKey = '723118fb280a46d5bc650aaaa26b3479'
const visualCrossingBaseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?'
const visualCrossingKey = 'ZQFMC9TG68TNK7BM2YRMJJFE2'

//Wrapping functionalities in a init() function to be executed only after DOM is ready
function init(){

    //Adding event listener to the 'form' DOM element (in the 'submit' button)
    document.getElementById('generate').addEventListener('click', performAction);

    //Executing a Callback function chaining promises 
    function performAction(event){

        event.preventDefault();

        if(validateForm() === true) {

            const travelDate = document.getElementById('date').value;
            const placeName = document.getElementById('place').value;
            const placeEncoded = encodeUrl(placeName); //encoding user entries to use in a url
            
            //Using user inputs to call geoNames API and get Latitude and Longitude parameters
            getCoordinatesFromApi(geoNamesBaseURL, placeEncoded, geoNamesKey)

            .then(data => { //saving API data (latitude, longitude and country) into primary object

                console.log('API object received by the callGeoNames, showing in the promise chaining function', data);
                primaryData = data;
                console.log('These are the data stored on primary obj:', primaryData);
                return primaryData;
            })

            .then(primaryData => { 

                if(dayCounter(travelDate) < 0){ //if the date entered by the user is in the past

                    alert('Please, enter a valid date');

                } else if(dayCounter(travelDate) <= 7){ //If the date entered by the user is within a week

                    //building url using 'lat' and 'long' parameters to call weatherBit API via server side
                    callApiViaServerSide('http://localhost:8081/callAPI', {urlBase: `${weatherBitBaseURL}lat=${primaryData.latitude}&lon=${primaryData.longitude}&key=${weatherBitKey}`})
                    
                    .then((newData) => {

                        updateUICurrentWeather(newData, travelDate)})

                } else { //If the date entered by the user is in the future fetch historical weather for the last 3 years

                    /* The 3 years of historical weather data are being fetched in 3 separate GET requests due to the
                    free API registration plan limitation */

                    (function getHistoricalWeather(){
                        
                        console.log('primeira coisa', primaryData);
                        const geoPlace = primaryData.latitude + ',' + primaryData.longitude;
                        const geoPlaceEncoded = encodeUrl(geoPlace);

                        const oneYearAgo = ()=>{
                            let setOneYear = new Date(travelDate);
                            setOneYear.setFullYear(setOneYear.getFullYear() - 1);
                            const oneYear = setOneYear.toISOString().split('.')[0];
                            return oneYear;
                        };

                        const twoYearAgo = ()=>{
                            let setTowYears = new Date(travelDate);
                            setTowYears.setFullYear(setTowYears.getFullYear() - 2);
                            const twoYears = setTowYears.toISOString().split('.')[0];
                            return twoYears;
                        };

                        const threeYearAgo = ()=>{
                            let setThreeYears = new Date(travelDate);
                            setThreeYears.setFullYear(setThreeYears.getFullYear() - 3);
                            const threeYears = setThreeYears.toISOString().split('.')[0];
                            return threeYears;
                        };


                        callApiViaServerSide('http://localhost:8081/callAPI', 
                        {urlBase: `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${oneYearAgo()}&endDateTime=${oneYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`})

                            .then(data => {

                                primaryData.oneYearPredictions = {
                                    date: data.location.values[0].datetimeStr,
                                    conditions: data.location.values[0].conditions,
                                    maxT: data.location.values[0].maxt,
                                    minT: data.location.values[0].mint,
                                    precipitation: data.location.values[0].precip
                                };
                            })

                        callApiViaServerSide('http://localhost:8081/callAPI', 
                        {urlBase: `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${twoYearAgo()}&endDateTime=${twoYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`})

                            .then(data => {

                                primaryData.twoYearPredictions = {
                                    date: data.location.values[0].datetimeStr,
                                    conditions: data.location.values[0].conditions,
                                    maxT: data.location.values[0].maxt,
                                    minT: data.location.values[0].mint,
                                    precipitation: data.location.values[0].precip
                                };
                            })

                        callApiViaServerSide('http://localhost:8081/callAPI', 
                        {urlBase: `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${threeYearAgo()}&endDateTime=${threeYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`})

                            .then(data => {

                                primaryData.threeYearPredictions = {
                                    date: data.location.values[0].datetimeStr,
                                    conditions: data.location.values[0].conditions,
                                    maxT: data.location.values[0].maxt,
                                    minT: data.location.values[0].mint,
                                    precipitation: data.location.values[0].precip
                                };

                                return primaryData;
                            })

                            .then(primaryData =>{
                                console.log('use data stored to updateUI', primaryData)
                            })
                    })();
                }
            })

        }else {
            alert('Please, fill in the empty fields')
        }
    }
}

export { init }