import {GET_YEARS, GET_TYPES, GET_LOCATION_DESCRIPTIONS, GET_CRIMES} from '../actions/search_actions';

const defaultState = {
    year: 0,
    yearOptions: [],
    type: '',
    typeOptions: [],
    locationDescription: '',
    locationDescriptions: [],
    crimes: []
}

export default function(state = defaultState, action){
    switch(action.type){
        case GET_YEARS:
            return Object.assign({}, state, { yearOptions: action.payload.data });
        case GET_TYPES:
            return Object.assign({}, state, { typeOptions: action.payload.data });
        case GET_LOCATION_DESCRIPTIONS:
            return Object.assign({}, state, { locationDescriptions: action.payload.data });
        case GET_CRIMES:
            return Object.assign({}, state, { crimes: action.payload });
        default:
            return state;
    }
}
