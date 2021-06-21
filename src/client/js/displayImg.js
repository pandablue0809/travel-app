function displayImg(primaryObj){

    try{
        const img = primaryObj.img;

        if(img === undefined){

            const defaultImg = 'https://cdn.pixabay.com/photo/2018/09/26/20/20/workplace-3705534_1280.jpg';
            const section = document.getElementById('results');
            const newElement = document.createElement('img');
            newElement.setAttribute('alt', `picture of the destination`);
            newElement.setAttribute('src', `${defaultImg}`);
            newElement.id = 'travel-img';
            section.insertAdjacentElement('afterbegin', newElement);

        } else{

            //const place = primaryObj.city;
            const section = document.getElementById('results');
            const newElement = document.createElement('img');
            newElement.setAttribute('alt', `picture of the destination`);
            newElement.setAttribute('src', `${img}`);
            newElement.id = 'travel-img';
            section.insertAdjacentElement('afterbegin', newElement);
        }
        
    } catch(err){
        
        console.log('Error to display destination image', err)
    }
}

export { displayImg }