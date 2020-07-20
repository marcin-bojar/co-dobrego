import { elements } from '../base.js';

export const clearResults = () => {
     elements.results.innerHTML = '';
     elements.title.innerHTML = '';
}

export const getInput = () => elements.where.value.trim().toLowerCase();

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
    elements.title.innerHTML = `<h2>Restauracje w mieście <span class="city-title"> ${arr[0].restaurant.location.city} </span></h2>`;
    elements.results.innerHTML = arr.map((el, i) => {
        return `
        <div class="results__restaurant" data-index=${i}>
            <p class="results__rate" style="background-color:#${el.restaurant.user_rating.rating_color};">${el.restaurant.user_rating.aggregate_rating}</p>
            <h2 class="heading-2">${el.restaurant.name}</h2>
            <h3 class="heading-3">${el.restaurant.cuisines}</h3>
            ${el.restaurant.thumb !== '' ? `<img src="${el.restaurant.thumb} alt="Restaurant image" class="results__img">` : ''}
            <p class="results__location">${el.restaurant.location.city}, ${el.restaurant.location.locality}</p>
            <p class="results__price">Średnia cena dla dwojga: <span>${el.restaurant.average_cost_for_two}${el.restaurant.currency}</span></p>
            <small class="results__more">Kliknij po więcej szczegółów!</small>
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

export const renderLoader = () => elements.loader.classList.add('shown');
export const hideLoader = () => elements.loader.classList.remove('shown');

export const hidePaginationButtons = () => elements.pages.innerHTML = '';

export const renderErrorMsg = (str) => {
    elements.results.innerHTML = `
    <div class="results__error">${str}</div>`
};