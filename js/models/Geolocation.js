import { setInput, renderErrorMsg } from '../views/searchView.js';
import { elements, options } from '../base.js';

// Get the location of user using HTML Geolaction API
export const getUserLocation = async () => {
    // Use compass icon in button as loader
    elements.compassIcon.classList.add('rotate');

    //Function used when user's location is retrieved
    async function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        
        // Use the Zomato API endpoint to find the location using user's latitude and longitude
        try {  
            const res = await fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`, options);
            const data = await res.json(); 
                 
            // Fill the input with user's location name
           setInput(data.location.city_name);
            // Focus on the input
            elements.where.focus();
            // Stop animating button icon
            elements.compassIcon.classList.remove('rotate');
        } catch (err) {
            alert('Houston, mamy problem!' + ' ' + err);
        }   
    }

    //Function used when error occurs while retrieving user location
    function error() {
       renderErrorMsg('Nie udało nam się pobrać Twojej lokalizacji, spróbuj ponownie.');
    }
    
    //Check if Geoloaction is supported by the browser
    if(!navigator.geolocation) {
        renderErrorMsg('Twoja przeglądarka nie obsługuje geolokalizacji.'); 
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
};