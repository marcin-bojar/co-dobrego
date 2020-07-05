import { options, elements } from './base.js';

import Search from './models/search.js';
import { getUserLocation } from './models/geolocation.js';

import * as searchView from './views/searchView.js';

// State object
const state = {};

///////////////////////
// Search Controller //
//////////////////////

const searchCtrl = async (id=null, type=null, start=null) => {

    //If parameters are provided then pagination button was clicked so...
    if(id !== null && type !== null && start !== null) {
        // ...search for another set of restaurants ('start' is responsible for the first item in the list)...
        await state.search.searchRestaurants(id, type, start);

        // ...display them in UI...
        searchView.renderRestaurantsList(state.search.searchDetails.restaurants);

        // ...and display pagination buttons if needed
        searchView.renderPaginationButtons(state.search.searchDetails, id);

    // If no parameters were provided then search form was submitted
    } else {
        //Clear previous results
        searchView.clearResults();
        
        //Get the location query from input
        const query = searchView.getInput();
    
        // Check input
        if(query) {
            // Update the state object
            state.search = new Search(query);
    
            // Search for cities 
            await state.search.searchForLocations();
    
            // If there are multipule matches for the city name entered by user show all possibilities
            if(state.search.cityMatches && state.search.cityMatches.length > 1) {
                // Display found cities
                searchView.renderCityResults(state.search.cityMatches);
    
            // If only one city matches the user's input then search for the restaurants in this city at once...
            } else if (state.search.cityMatches.length === 1) {
                const cityID = state.search.cityMatches[0].id;
                await state.search.searchRestaurants(cityID);
               
                // ...and display them in UI...
                searchView.renderRestaurantsList(state.search.searchDetails.restaurants);

                // ...along with pagination buttons if needed
                searchView.renderPaginationButtons(state.search.searchDetails, cityID)

            // If there is no match for the city entered by user
            } else {
                searchView.renderErrorMsg('Tego miasta nie ma w naszej bazie danych, przepraszamy');
            }   
        // If no input was provided
        } else {
            state.search = null;
            alert('Podaj miejscowość, proszę...');
        }

    }
};

// Search event listeners
elements.form.addEventListener('submit', e => {
    e.preventDefault();
    searchCtrl();
});
elements.where.addEventListener('focusout', e => e.target.value = '');
elements.pages.addEventListener('click', e => {
    const entity_id = e.target.dataset.entity_id;
    const entity_type = e.target.dataset.entity_type;
    const start = e.target.dataset.start;

    if(e.target.tagName === 'BUTTON') {
        searchCtrl(entity_id, entity_type, start);
    }
    
});



/////////////////////////////
// Geolocation Controller //
///////////////////////////

const geoCtrl = () => {
    // Get the location of user's device
    getUserLocation();    
};


// Geolocation event listeners
elements.locationBtn.addEventListener('click', geoCtrl);


