function validateForm(){

    const inputPlace = document.getElementById('place').value;
    console.log('aqui', inputPlace, 'ponto');
    const inputDate = document.getElementById('date').value;
    console.log('aqui', inputDate, 'ponto');

    if(inputPlace === ""){
        return false;

    } else if(inputDate === NaN || inputDate === ""){
        return false;

    } else{
        return true;
    }
}

export { validateForm }