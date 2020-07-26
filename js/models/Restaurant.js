import { options } from '../base.js';

export default class Restaurant {
    constructor(index) {
        this.index = index
    }

    // Get the restaurant's details from state object (no need to fetch data, its already stored in state object when search was completed)
    getRestaurantDetails(state) {
        const restaurant = state.search.searchDetails.restaurants[this.index].restaurant;
        
        this.location = restaurant.location;
        this.highlights = restaurant.highlights;
        this.name = restaurant.name;
        this.cuisines = restaurant.cuisines;
        this.phone_numbers = restaurant.phone_numbers;
        this.timings = restaurant.timings;
        this.user_rating = restaurant.user_rating;
        // console.log(state.search.searchDetails.restaurants[this.index].restaurant);   
    }

    // Get the position of mouse when restaurant item in search results list was clicked for animation transform origin
    getMousePosition(e) {
        if(e.target.closest('div').className= 'results__restaurant') {
            const x = e.clientX;
            const y = e.clientY;

            return {
                x,
                y
            }
        }
    };
};