import { elements } from '../base.js';

export const clearResults = () => elements.results.innerHTML = '';

export const getInput = () => elements.where.value.trim();

export const setInput = (str) => elements.where.value = str;

// Display cities that matches search query in UI
export const renderCityResults = (arr) => {
    elements.results.innerHTML = arr.map(el => {
        return `
            <div class="results__city" data-id=${el.id}>
                <h2>${el.name}</h2>
                <p>${el.country_name}</p>
                <img src=${el.country_flag_url} alt="Country flag">
            </div>`
    }).join('');
};

// Display the list of restaurants in UI
export const renderRestaurantsList = (arr) => {
    elements.results.innerHTML = arr.map(el => {
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

// Display pagination buttons when needed
export const renderPaginationButtons = (data, entity_id, entity_type='city') => {
    if (data.results_found > 20) {
    elements.pages.innerHTML = `
    
    ${data.results_start > 0 ? `<button class="btn btn-prev" data-start=${data.results_start-20} data-entity_id=${entity_id} data-entity_type=${entity_type}>Poprzednia</button>` : ''} 

    ${data.results_start < 80 ? `<button class="btn btn-next" data-start=${data.results_start+20} data-entity_id=${entity_id} data-entity_type=${entity_type}>Następna</button>` : ''} 
    `;  
    } else {
        elements.pages.innerHTML = '';  
    }
};

export const hidePaginationButtons = () => elements.pages.innerHTML = '';

export const renderErrorMsg = (str) => {
    elements.results.innerHTML = `
    <div class="results__error">${str}</div>`
};