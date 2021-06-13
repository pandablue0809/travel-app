//Importing helper functions
import { encodeUrl } from './urlEncoder'
import { getCoordinatesFromApi } from './callGeonamesApi'
import { callApiViaServerSide } from './postRequestToServer'
import { dayCounter } from './counter'
import { updateUICurrentWeather } from './updateUICurrentW'

//Primary Object to hold data from GeoNames API
var primaryData = {};

//* APIs keys *//
const geoNamesBaseURL = 'http://api.geonames.org/searchJSON?q='
const geoNamesKey = 'janainamj'
const weatherBitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherBitKey = '723118fb280a46d5bc650aaaa26b3479'

//Wrapping functionalities in a init() function to be executed only after DOM is ready
function init(){

    //Adding event listener to the 'form' DOM element (in the 'submit' button)
    document.getElementById('generate').addEventListener('click', performAction);

    //Executing a Callback function chaining promises 
    function performAction(event){

        event.preventDefault();

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

            } else { //If the date entered by the user is in the future

                callApiViaServerSide('http://localhost:8081/callAPI', {urlBase: ``})

                .then(console.log(`Your trip is ${dayCounter(travelDate)} days away`))
            }
        })

    }
}

export { init }