//zomato API key 4c1ca49f67fc297d5954541a5b8819d0
const options = {
    headers: {
        'Accept': 'application/json',
        'user-key': '4c1ca49f67fc297d5954541a5b8819d0',
    }
};

const where = document.getElementById('where');
const form = document.getElementById('form');
const results = document.getElementById('results');

// Use the input value to search for location in database
async function getLocationInput(e) {
    e.preventDefault();

    //Clear previous results
    results.innerHTML = '';

    //Get the location from input
    const location = where.value.trim();

    //Check input
    if(location) {
        try {
            const res = await fetch(`https://developers.zomato.com/api/v2.1/locations?query=${location}`, options);
            const data = await res.json();
            console.log(data);
            // If there is a match for the city entered by user
            if(data.location_suggestions.length > 0 && data.location_suggestions.length < 2) {
                const { entity_type, entity_id } = data.location_suggestions[0];
                searchRestaurants(entity_id, entity_type);
            } else {
                results.innerHTML = 'Tego miasta nie ma w naszej bazie danych, przepraszamy';
            }    
        } catch(err) {
            alert('Houston, mamy problem!', err);
        }
    } else {
        alert('Proszę podać miejscowość...');
    }
        
        
};

// Search for restaurants in specified city
async function searchRestaurants(entity_id, entity_type) {
    try {
        const res = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}`, options);
        const data = await res.json();
        console.log(data);
        renderRestaurantsList(data.restaurants);
    } catch(err) {
        alert('Houston, mamy problem!', err);
    }
    
};

function renderRestaurantsList(arr) {
    results.innerHTML = arr.map(el => {
        return `
        <div class="results__restaurant">
            <div class="results__rate">${el.restaurant.user_rating.aggregate_rating}</div>
            <h2 class="heading-2">${el.restaurant.name}</h2>
            <h3 class="heading-3">${el.restaurant.cuisines}</h3>
            <div class="results__location">${el.restaurant.location.city}, ${el.restaurant.location.locality}</div>
            <div class="results__price">Średnia cena dla dwojga: <span>${el.restaurant.average_cost_for_two}${el.restaurant.currency}</span></div>
            <div class="results__more">
                <p>Kliknij po więcej szczegółów!</p>
            </div>
        </div>`
    }).join('');
}

//Event listeners
where.addEventListener('focusout', e => e.target.value = '');
form.addEventListener('submit', getLocationInput);