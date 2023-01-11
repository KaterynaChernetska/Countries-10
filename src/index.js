import './css/styles.css';
import debounce  from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const ulElement = document.querySelector('.country-list');
const container = document.querySelector('.country-info');

input.addEventListener('input', debounce(onFieldInput,DEBOUNCE_DELAY));

function onFieldInput (event) {
        const value = input.value.trim();
        console.log(value);

        if (value.length === 0) {
            container.innerHTML = '';
            ulElement.innerHTML = '';
            return;
        }

        fetchCountries(value)
        .then(createMarkup)
        .catch(err => {
                 if (err === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name')}})
            container.innerHTML = '';
            ulElement.innerHTML = '';
        }

function createMarkup(array) {        
         container.innerHTML = '';
        if (array.length >=10) {
             Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } 
        else if (array.length >= 2 && array.length <= 10) {
   
             const list = array.map(el =>
                 `<li>
                 <img src = ${el.flags.svg} width = '30' height = '15'/>
                 ${el.name.official} </li>`
        )
        ulElement.innerHTML = list.join('');        
    }

        else {    
            ulElement.innerHTML = '';
             const countryInfo = array.map(el =>
                 `<h1 class = 'country-name'> <img src = ${el.flags.svg} width = '30' height = '20'/> ${el.name.official} </h1>
                 <ul>
                 <li><span class = 'text'>Capital:</span> ${el.capital}</li>
                 <li><span class = 'text'>Population:</span> ${el.population}</li>
                 <li><span class = 'text'>Languages:</span> ${Object.values(el.languages)}</li>`
        )
        container.innerHTML = countryInfo.join('');
    }
} 

