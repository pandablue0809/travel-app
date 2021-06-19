const getPlaceImg = async(primaryObj, baseUrl, place, apiKey)=>{

    const res = await fetch(`${baseUrl}?key=${apiKey}&q=${place}&per_page=3&safesearch=true&orientation=horizontal`)

    try{
        const apiData = await res.json();
        const data = primaryObj.img = apiData.hits[0].largeImageURL;
        console.log('API object received by the Pixabay function', apiData);
        return data;
    }catch(error){
        console.log('Error getting object from API', error);
    }
}

export { getPlaceImg }