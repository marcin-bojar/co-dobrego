import { elements } from './base.js';

import Search from './models/Search.js';
import Restaurant from './models/Restaurant.js';
import { getUserLocation } from './models/Geolocation.js';

import * as searchView from './views/searchView.js';
import * as restaurantView from './views/restaurantView.js';

// State object
const state = {};

///////////////////////
// Search Controller //
//////////////////////

const searchCtrl = async (id=null, type=null, start=null) => {

    //If parameters are provided then pagination button was clicked or city has been selected from list so...
    if(id !== null && type !== null && start !== null) {

        //Display loader...
        searchView.renderLoader();

        // ...scroll to the top of results...
        elements.title.scrollIntoView();

        // ...search for (another) set of restaurants ('start' is responsible for the first item in the list)...
        await state.search.searchRestaurants(id, type, start);

        //...hide loader...
        searchView.hideLoader();
        

        // ...display restaurants in UI...
        searchView.renderRestaurantsList(state.search.searchDetails.restaurants);

        // ...and display pagination buttons if needed
        searchView.renderPaginationButtons(state.search.searchDetails, id);

    // If no parameters were provided then search form was submitted
    } else {
        // Hide pagination buttons
        searchView.hidePaginationButtons();
        
        //Clear previous results
        searchView.clearResults();

        //Display loader
        searchView.renderLoader();
        
        //Get the location query from input
        const query = searchView.getInput();
    
        // Check input
        if(query) {
            // Update the state object
            state.search = new Search(query);

            // Parse the query in search object
            state.search.parseQuery();

            // Search for cities
            try {
                await state.search.searchForLocations();
        
                // If there are multipule matches for the city name entered by user show all possibilities
                if(state.search.cityMatches && state.search.cityMatches.length > 1) {
                    
                    //Hide loader
                    searchView.hideLoader();

                    // Display found cities
                    searchView.renderCityResults(state.search.cityMatches);
        
                // If only one city matches the user's input then search for the restaurants in this city at once...
                } else if (state.search.cityMatches.length === 1) {
                    const cityID = state.search.cityMatches[0].id;
                    await state.search.searchRestaurants(cityID);

                    // (hide loader meanwhile)
                    searchView.hideLoader();
                   
                    // ...and display them in UI...
                    searchView.renderRestaurantsList(state.search.searchDetails.restaurants);
    
                    // ...along with pagination buttons if needed
                    searchView.renderPaginationButtons(state.search.searchDetails, cityID);

                    // Scroll to the top of results
                    elements.title.scrollIntoView();
    
                    // console.log(state);
    
                // If there is no match for the city entered by user
                } else {
                    searchView.renderErrorMsg('Tego miasta nie ma w naszej bazie danych, przepraszamy...');
                    searchView.hideLoader();
                }   
            }catch (err) {
                alert('Houston, mamy problem!' + ' ' + err);
                searchView.hideLoader();
            }
            
        // If no input was provided
        } else {
            state.search = null;
            alert('Podaj miejscowość, proszę...');
            searchView.hideLoader();
        }

    }
};

// Search event listeners

//Handle sumbit event on search form
elements.form.addEventListener('submit', e => {
    e.preventDefault();
    searchCtrl();
});

// Clear the input when focused out
elements.where.addEventListener('focusout', e => e.target.value = '');

// Handle click event on pagination buttons
elements.pages.addEventListener('click', e => {
    const entity_id = e.target.dataset.entity_id;
    const entity_type = e.target.dataset.entity_type;
    const start = e.target.dataset.start;

    if(e.target.tagName === 'BUTTON') {
        searchCtrl(entity_id, entity_type, start);
    }
    
});

// Handle click event on item in city results list
elements.results.addEventListener('click', e => {
    
    if(e.target.closest('div').className === 'results__city') {
        const cityID = e.target.closest('div').dataset.id;
        searchCtrl(cityID, 'city', 0);
    }

    // Handle click event on item in restaurants list
    if(e.target.closest('div').className === 'results__restaurant') {
        restaurantCtrl(e);
    }
});



/////////////////////////////
// Restaurant Controller //
///////////////////////////

const restaurantCtrl = (e) => {
    // Get the index of the restaurant in results' array in search object
    const index = +e.target.closest('div').dataset.index;
    
    // Create new resutaurant object
    const restaurant = new Restaurant(index);

    // Get restaurant data from state object
    restaurant.getRestaurantDetails(state);

    // Add it to state object
    state.restaurant = restaurant;

    // Retrieve the position of mouse in the moment when click happened (used as transform origin of restaurant details popup animation)
    const {x, y} = restaurant.getMousePosition(e);

    // Display restaurants details in UI
    restaurantView.renderRestaurantDetails(x, y, restaurant);

};

// Restaurant event listeners

//Close the restaurant details popup with the 'x' icon
elements.restaurantDetails.addEventListener('click', e => {
    if(e.target.className === 'restaurant-details__close')
        restaurantView.hideRestaurantDetails();
});

// Close the restaurant details popup by clicking anywhere outside it
elements.overlay.addEventListener('click', () => {
    restaurantView.hideRestaurantDetails();
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