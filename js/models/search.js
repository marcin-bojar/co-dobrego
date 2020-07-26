import { options } from '../base.js';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Search for location provided by user in database
    async searchForLocations() {
        try {
            const res = await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${this.query}`, options);
            const data = await res.json();
            // console.log(data);
            this.cityMatches = data.location_suggestions;
        } catch (err) {
            alert('Houston, mamy problem!' + ' ' + err);
        }
    };

    // Search for restaurants in specified city
    async searchRestaurants(entity_id, entity_type='city', start=0, count=20) {
        try {
            const res = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}&count=${count}&start=${start}`, options);
            const data = await res.json();
            console.log(data);
            this.searchDetails = data;
        } catch(err) {
            alert('Houston, mamy problem!' + ' ' + err);
        }
        
    };

    // Parse the user's input
    parseQuery() {
        if(this.query === 'warszawa') {
            this.query = 'warsaw';
        }
        if(this.query === 'waszyngton') {
            this.query = 'washington';
        }
    }
};