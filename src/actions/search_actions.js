import axios from 'axios';
import _ from 'lodash';

export const GET_TYPES = 'get-types';
export const GET_LOCATION_DESCRIPTIONS = 'get-location-descriptions';
export const GET_YEARS = 'get-years';
export const GET_CRIMES = 'get-crimes';

const TAKE = 10000;
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

export function getCrimes(year='', primaryType='', locationDescription=''){
  return dispatch => {
    axios.get(`${URL_BASE}/crimescount`)
      .then(res => {
        const totalCrimes = res.data[0].count;
        let numApiCalls = Math.floor(totalCrimes / TAKE);
        if(totalCrimes % TAKE > 0){
          numApiCalls++;
        }

        if(numApiCalls <= 0){
          return;
        }

        let query = `${URL_BASE}/crimes?year=${year}&primaryType=${primaryType}&locationDescription=${locationDescription}&take=${TAKE}`;

        let requests = [];
        for(let i = 0; i < numApiCalls; i++){
          requests.push(axios.get(`${query}&skip=${TAKE * i}`, {timeout: 30000}));
        }

        axios.all(requests)
          .then((allRes) => {
            let crimes = [];
            _.forEach(allRes, indRes => {
              _.forEach(indRes.data, crime => {
                crimes.push(crime);
              })
            });

            dispatch({
              type: GET_CRIMES,
              payload: crimes
            });
          });
      });
  };
}
