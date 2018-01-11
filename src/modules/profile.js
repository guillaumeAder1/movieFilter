import axios from 'axios'
export const SEARCHING = 'profile/SEARCH'
export const SEARCHING_END = 'profile/SEARCH_END'
export const MOVIES_FOUND = 'profile/MOVIES_FOUND'
export const GET_MOVIE = 'profile/GET_MOVIE'
const initialState = {
    count: 0,
    search: 'Not searching',
    results: false
}
const apikey = 'f3908e54ee28cf7e6fdd65636949dee0'
export default (state = initialState, action) => {

    switch (action.type) {
        case GET_MOVIE:
            return {
                ...state,
                results: action.payload
            }
        case MOVIES_FOUND:
            return {
                ...state,
                results: action.payload
            }
        case SEARCHING:
            return {
                ...state,
                search: 'is searching...'
            }
        case SEARCHING_END:
            return {
                ...state,
                search: 'Searching ends'
            }
        default:
            return state
    }
}

export const getMovie = () => {
    return dispatch => {
        dispatch({
            type: GET_MOVIE,
            payload: axios.get('https://api.themoviedb.org/3/search/movie?api_key=' +
                apikey + '&language=en-US&query=terminator&page=1&include_adult=false').then(res => {
                dispatch({
                    type: MOVIES_FOUND,
                    payload: res.data.results
                })
            })
        })
    }
}

export const getSearch = () => {
    return dispatch => {
        dispatch({
            type: SEARCHING
        })
    }
}
export const stopSearch = () => {
    return dispatch => {
        dispatch({
            type: SEARCHING_END
        })
    }
}