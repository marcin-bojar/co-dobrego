//zomato API key 4c1ca49f67fc297d5954541a5b8819d0
const options = {
    headers: {
        'Accept': 'application/json',
        'user-key': '4c1ca49f67fc297d5954541a5b8819d0'
    }
};

const where = document.getElementById('where');
const form = document.getElementById('form');
const results = document.getElementById('results');

// Use the input value to search for location in database
async function getLocation(e) {
    e.preventDefault();
    results.innerHTML = '';
    const location = where.value.trim();
    if(location) {
        const res = await fetch(`https://developers.zomato.com/api/v2.1/locations?query=${location}
        `, options);
        const data = await res.json();
        console.log(data);
        if(data.location_suggestions.length > 0) {
            const { entity_type, entity_id, title } = data.location_suggestions[0];
            searchRestaurants(entity_id, entity_type);
        } else {
            results.innerHTML = 'Tego miasta nie ma w naszej bazie danych, przepraszamy';
        }    
    } else {
        alert('Proszę podać miejscowość...');
    }
    
};

async function searchRestaurants(entity_id, entity_type) {
    const res = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=${entity_type}`, options);
    const data = await res.json();
    console.log(data);
};

//Event listeners
where.addEventListener('focusout', e => e.target.value = '');
form.addEventListener('submit', getLocation);