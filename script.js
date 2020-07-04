const options = {
    headers: {
        'Accept': 'application/json',
        'user-key': '4c1ca49f67fc297d5954541a5b8819d0',
    }
};

const where = document.getElementById('where');
const form = document.getElementById('form');
const results = document.getElementById('results');
const locationBtn = document.getElementById('location');
const compassIcon = document.getElementById('compass');
const pages = document.getElementById('pages');

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
        
    // If no input was provided
    } else {
        alert('Podaj miejscowość, proszę...');
    }        
};

// Search for restaurants in specified city
async function searchRestaurants(entity_id, entity_type, start=0, count=20) {
    try {
        const res = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}&count=${count}&start=${start}`, options);
        const data = await res.json();
        console.log(data);
        renderRestaurantsList(data.restaurants);
        renderPaginationButtons(data, entity_id, entity_type);
    } catch(err) {
        alert('Houston, mamy problem!', err);
    }
    
};

// Get the location of user using HTML Geolaction API
function getUserLocation() {

    //Function used when user's location is retrieved
    async function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        try {
            compassIcon.classList.add('rotate');
            const res = await fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`, options);
            const data = await res.json();
            compassIcon.classList.remove('rotate');
            // Fill the input with user's location name
            where.value = data.location.city_name;
            // Focus on the input
            where.focus();
        } catch (err) {
            alert('Houston, mamy problem!', err);
        }   
    }

    //Function used when error occurs while retrieving user location
    function error() {
        results.innerHTML = 'Nie udało nam się pobrać Twojej lokalizacji, spróbuj ponownie.';
    }
    //Check if Geoloaction is supported by the browser
    if(!navigator.geolocation) {
        results.innerHTML = 'Twoja przeglądarka nie obsługuje geolokalizacji.'; 
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

// Display found restaurants in UI
function renderRestaurantsList(arr) {
    results.innerHTML = arr.map(el => {
        return `
        <div class="results__restaurant">
            <div class="results__rate">${el.restaurant.user_rating.aggregate_rating}</div>
            <h2 class="heading-2">${el.restaurant.name}</h2>
            <h3 class="heading-3">${el.restaurant.cuisines}</h3>
            ${el.restaurant.thumb !== '' ? `<img src="${el.restaurant.thumb} alt="Restaurant image" class="results__img">` : ''}
            <div class="results__location">${el.restaurant.location.city}, ${el.restaurant.location.locality}</div>
            <div class="results__price">Średnia cena dla dwojga: <span>${el.restaurant.average_cost_for_two}${el.restaurant.currency}</span></div>
            <p class="results__more">Kliknij po więcej szczegółów!</p>
        </div>`
    }).join('');
};

async function renderMoreResults(e) {
    const entity_id = e.target.dataset.entity_id;
    const entity_type = e.target.dataset.entity_type;
    const start = e.target.dataset.start;

    if(e.target.tagName === 'BUTTON') {
        searchRestaurants(entity_id, entity_type, start);
    }
};

function renderPaginationButtons(data, entity_id, entity_type) {
    if (data.results_found > 20) {
    pages.innerHTML = `
    
    ${data.results_start > 0 ? `<button class="btn btn-prev" data-start=${data.results_start-20} data-entity_id=${entity_id} data-entity_type=${entity_type}>Poprzednia</button>` : ''} 

    ${data.results_start < 80 ? `<button class="btn btn-next" data-start=${data.results_start+20} data-entity_id=${entity_id} data-entity_type=${entity_type}>Następna</button>` : ''} 
    `;  
    } else {
        pages.innerHTML = '';  
    }
};

//Event listeners
where.addEventListener('focusout', e => e.target.value = '');
form.addEventListener('submit', getLocationInput);
locationBtn.addEventListener('click', getUserLocation);
pages.addEventListener('click', renderMoreResults);