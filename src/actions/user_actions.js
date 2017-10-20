import axios from 'axios';

export const GET_USER = 'get_user';

export function getUser(){
    const request = axios.get('url_here');

    return{
        type: GET_USER,
        payload: request
    };
}
