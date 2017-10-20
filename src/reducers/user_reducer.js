import { GET_USER } from '../actions/index';

export default function(state, action) {
    switch(action.type) {
        case GET_USER:
            console.log('Get user reducer');
        default:
            return state;
    }
}