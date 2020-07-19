export const options = {
    headers: {
        'Accept': 'application/json',
        'user-key': '4c1ca49f67fc297d5954541a5b8819d0',
    }
};

export const elements = {
    where: document.getElementById('where'),
    form: document.getElementById('form'),
    title: document.getElementById('results-title'),
    results: document.getElementById('results'),
    locationBtn: document.getElementById('location'),
    compassIcon: document.getElementById('compass'),
    pages: document.getElementById('pages'),
    loader: document.getElementById('loader'),
    restaurant: document.querySelector('.results__restuarant'),
    restaurantDetails: document.getElementById('restaurant-details'),
    closeRestaurantDetails: document.querySelector('.restaurant-details__close'),
    overlay: document.getElementById('overlay')
};