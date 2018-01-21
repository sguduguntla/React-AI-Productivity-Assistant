import { ADD_WEBSITE_VISITED_TIME, FETCH_VISITED_SITES_SUCCESS } from '../actions/types';

const INITIAL_STATE = { visitedSites: [] };

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_WEBSITE_VISITED_TIME:
            return { ...state };
        case FETCH_VISITED_SITES_SUCCESS:
            return { ...state, visitedSites: action.payload };
        default:
            return state;
    }
};
