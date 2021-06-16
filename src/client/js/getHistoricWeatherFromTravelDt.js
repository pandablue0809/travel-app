import { callApiViaServerSide } from "./postRequestToServer"

/* The 3 years of historical weather data are being fetched in 3 separate GET requests due to the
free API registration plan limitation */
const getHistoricWeatherFromTravelDt = async (obj, apiUrl1, apiUrl2, apiUrl3)=>{

    const respOne = await callApiViaServerSide('http://localhost:8081/callAPI', {urlBase:apiUrl1})
    const respTwo = await callApiViaServerSide('http://localhost:8081/callAPI', {urlBase:apiUrl2})
    const respThree = await callApiViaServerSide('http://localhost:8081/callAPI', {urlBase:apiUrl3})

    try{

        const storeDataOne = await respOne;

        obj.oneYearPredictions = {
            date: storeDataOne.location.values[0].datetimeStr,
            conditions: storeDataOne.location.values[0].conditions,
            maxT: storeDataOne.location.values[0].maxt,
            minT: storeDataOne.location.values[0].mint,
            precipitation: storeDataOne.location.values[0].precip
        }

        const storeDataTwo = await respTwo;

        obj.twoYearPredictions = {
            date: storeDataTwo.location.values[0].datetimeStr,
            conditions: storeDataTwo.location.values[0].conditions,
            maxT: storeDataTwo.location.values[0].maxt,
            minT: storeDataTwo.location.values[0].mint,
            precipitation: storeDataTwo.location.values[0].precip
        }

        const storeDataThree = await respThree;

        obj.threeYearPredictions = {
            date: storeDataThree.location.values[0].datetimeStr,
            conditions: storeDataThree.location.values[0].conditions,
            maxT: storeDataThree.location.values[0].maxt,
            minT: storeDataThree.location.values[0].mint,
            precipitation: storeDataThree.location.values[0].precip
        }

        return obj;

    } catch(err){
        console.log('Erro tentando fazer uma promisse', err);
    }
}

export { getHistoricWeatherFromTravelDt }