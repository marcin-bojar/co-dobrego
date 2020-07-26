import { elements } from '../base.js';

export const renderRestaurantDetails = (x, y, restaurant) => {
    elements.restaurantDetails.style.transformOrigin = `calc(${x}px - 73%) calc(${y}px - 58%)`;
    elements.restaurantDetails.classList.add('active');
    elements.overlay.classList.add('active');

    const highlights = restaurant.highlights.map(el => translateRestaurantHighlightsToPolish(el));
    
    console.log(restaurant);
    elements.restaurantDetails.innerHTML = `
        <div class="restaurant-details__info">
            <p class="restaurant-details__close">&times;</p>
            <h2 class="heading-2">${restaurant.name}</h2>
            <div class="restaurant-details__highlights">${highlights.map(el => `
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
    // 'hide' class changes opacity to 0 (animated by transition) 
    elements.restaurantDetails.classList.add('hide');
    // delete all addtional class names after opacity animation (setTimeout prevents popup from visibile scaling to 0 when 'active' class is removed)
    setTimeout( () => elements.restaurantDetails.classList.remove('active', 'hide'), 500);
    // remove overlay opacity
    elements.overlay.classList.remove('active');
};

const translateRestaurantHighlightsToPolish = highlight => {
    switch(highlight.toLowerCase()) {
        case 'pet friendly':
            return 'Przyjazna dla zwierząt';
        case 'serves alcohol':
            return 'Serwuje alkohol';
        case 'dinner':
            return 'Obiady';
        case 'indoor seating':
            return 'Miejsca w środku';
        case 'free parking': 
            return 'Darmowy parking';
        case 'vegetarian friendly':
            return 'Przyjazna wegetarianom';
        case 'kid friendly':
            return 'Przyjazna dzieciom';
        case 'credit card':
            return 'Płatności kartą';
        case 'outdoor seating':
            return 'Miejsca na zewnątrz';
        case 'group meal':
            return 'Obsługuje grupy';
        case 'disabled friendly':
            return 'Przyjazna niepełnosprawnym';
        case 'live music':
            return 'Muzyka na żywo';
        case 'delivery':
            return 'Dostawa';
        case 'live sports screening':
            return 'Relacje sportowe na żywo';
        case 'breakfast':
            return 'Śniadania';
        case 'smoking area':
            return 'Miejsce dla palących';
        case 'no alcohol available':
            return 'Brak alkoholu';
        case 'takeaway available':
            return 'Na wynos';
        case 'serves cocktails':
            return 'Drinki';
        case 'wine':
            return 'Wino';
        case 'beer':
            return 'Piwo';
        case 'gluten free options':
            return 'Dania bezglutenowe';
        case 'table booking not available':
            return 'Brak możliwości rezerwacji';
        case 'cash':
            return 'Gotówka';
        case 'board games':
            return 'Gry planszowe';
        case 'street parking':
            return 'Parking przy drodze';
        case 'desserts and bakes':
            return 'Desery';
        case 'snacks':
            return 'Przekąski';
        case 'visa for credit card':
            return 'Visa';
        case 'mastercard for credit card':
            return 'Mastercard';
        case 'vegan options':
            return 'Vegan';
        case 'kosher':
            return 'Dania koszerne';
        case 'table booking recommended':
            return 'Zalecana rezerwacja';
        case 'debit card':
            return 'Płatności kartą';
        case 'dog friendly':
            return 'Przyjazna psom';
        case 'michelin starred':
            return 'Gwiazdka Michelin';
        case 'private dining area available':
            return 'Dostępna strefa prywatna';
        case 'dance floor':
            return 'Parkiet taneczny';
        
        default:
            return highlight;
    }
};