import {GET_YEARS, GET_TYPES, GET_LOCATION_DESCRIPTIONS} from '../actions/search_actions';

const defaultState = {
    year: 0,
    yearOptions: [],
    type: '',
    typeOptions: [],
    locationDescription: '',
    locationDescriptions: [],
    results: []
}

export default function(state = defaultState, action){
    switch(action.type){
        case GET_YEARS:
            return Object.assign({}, state, { yearOptions: action.payload.data });
        case GET_TYPES:
            return Object.assign({}, state, { typeOptions: action.payload.data });
        case GET_LOCATION_DESCRIPTIONS:
            return Object.assign({}, state, { locationDescriptions: action.payload.data });
        default:
            return state;
    }
}
