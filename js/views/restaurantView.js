import { elements } from '../base.js';

export const renderRestaurantDetails = (x, y, restaurant) => {
    elements.restaurantDetails.style.transformOrigin = `${x}px ${y}px`;
    elements.restaurantDetails.style.visibility = 'visible';
    elements.restaurantDetails.style.transform = 'scale(1)';
    elements.restaurantDetails.style.opacity = '1';

    elements.restaurantDetails.innerHTML = `
        <div class="restaurant-details__info">
            <p class="restaurant-details__close">X</p>
            <h2 class="heading-2">${restaurant.name}</h2>
            <div class="restaurant-details__highlights">${restaurant.highlights.map(el => `
                <div class="restaurant-details__highlight">${el}</div>
            `).join('')}
            </div>
            <p class="restaurant-details__time">Godziny otwarcia: ${restaurant.timings}</p>
            <p class="restaurant-details__phone">Numer telefonu: ${restaurant.phone_numbers}</p>
        </div>
    `
};

export const hideRestaurantDetails = e => {
        elements.restaurantDetails.style.transform = 'scale(0)';
        elements.restaurantDetails.style.opacity = '0';
        // elements.restaurantDetails.style.visibility = 'hidden';
};