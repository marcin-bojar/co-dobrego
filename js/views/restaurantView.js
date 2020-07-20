import { elements } from '../base.js';

export const renderRestaurantDetails = (x, y, restaurant) => {
    elements.restaurantDetails.style.transformOrigin = `calc(${x}px - 73%) calc(${y}px - 58%)`;
    elements.restaurantDetails.classList.add('active');
    elements.overlay.classList.add('active');
    
    console.log(restaurant);
    elements.restaurantDetails.innerHTML = `
        <div class="restaurant-details__info">
            <p class="restaurant-details__close">&times;</p>
            <h2 class="heading-2">${restaurant.name}</h2>
            <div class="restaurant-details__highlights">${restaurant.highlights.map(el => `
                <div class="restaurant-details__highlight">${el}</div>
            `).join('')}
            </div>
            <ul class="restaurant-details__list">
                ${restaurant.timings.length > 0 ? 
                `<li class="restaurant-details__item"><h3 class="heading-3">Godziny otwarcia:</h3> ${restaurant.timings}</li>`
                : ''}
                <li class="restaurant-details__item">
                    <p><h3 class="heading-3">Adres:</h3> ${restaurant.location.address}</p>
                </li>
                ${restaurant.phone_numbers !== 'Not available for this place' ?
                `<li class="restaurant-details__item"><h3 class="heading-3">Numer telefonu:</h3> ${restaurant.phone_numbers}</li>`
                : ''}            
            </ul>
        </div>
    `
};

export const hideRestaurantDetails = () => {
    elements.restaurantDetails.classList.add('hide');
    setTimeout( () => elements.restaurantDetails.classList.remove('active', 'hide'), 500);
    elements.overlay.classList.remove('active');
};