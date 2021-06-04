//Importing helper functions
import { encodeUrl } from './urlEncoder'
import { getCoordinatesFromApi } from './callGeonamesApi'

//* APIs keys *//
const geoNamesBaseURL = 'http://api.geonames.org/searchJSON?q='
const geoNamesKey = 'janainamj'

//Wrapping functionalities in a init() function to be executed only after DOM is ready
function init(){

    //Adding event listener to the 'form' DOM element (in the 'submit' button)
    document.getElementById('generate').addEventListener('click', performAction);

    //Executing a Callback function chaining promises 
    function performAction(event){

        event.preventDefault();

        const travelDate = document.getElementById('date').value;
        let placeName = document.getElementById('place').value;
        const placeEncoded = encodeUrl(placeName); //encoding user entries to use in a url

        //Using user inputs to call geoNames API and get Latitude and Longitude parameters
        getCoordinatesFromApi(geoNamesBaseURL, placeEncoded, geoNamesKey)

    }
}

export { init }