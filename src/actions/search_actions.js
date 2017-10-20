import axios from 'axios';

export const GET_TYPES = 'get-types';
export const GET_DESCRIPTIONS = 'get-descriptions';
export const GET_LOCATION_DESCRIPTIONS = 'get-location-descriptions';
export const GET_YEARS = 'get-years';
export const GET_CRIMES = 'get-crimes';

const URL_BASE = 'https://uycy8d15y2.execute-api.us-east-1.amazonaws.com/dev';

export function getYears(){
    const request = axios.get(`${URL_BASE}/years`);
    return{
        type: GET_YEARS,
        payload: request
    };
}

export function getTypes(){
    const request = axios.get(`${URL_BASE}/types`);

    return{
        type: GET_TYPES,
        payload: request
    };
}

export function getLocationDescriptions(primaryType, description){
    const request = axios.get(`${URL_BASE}/locationdescriptions`);

    return{
        type: GET_LOCATION_DESCRIPTIONS,
        payload: request
    };
}

export function getCrimes(year, primaryType, location, locationDescription){
    const request = axios.get('url_here');

    return{
        type: GET_CRIMES,
        payload: request
    }
}