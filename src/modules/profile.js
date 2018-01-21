import axios from 'axios'
export const SEARCHING = 'profile/SEARCH'
export const SEARCHING_END = 'profile/SEARCH_END'
export const MOVIES_FOUND = 'profile/MOVIES_FOUND'
export const GET_MOVIE = 'profile/GET_MOVIE'
export const GET_TOKEN = 'profile/GET_TOKEN'
export const TOKEN_FOUND = 'profile/TOKEN_FOUND'
export const GET_SESSION = 'profile/GET_SESSION'
export const SESSION_FOUND = 'profile/SESSION_FOUND'
const initialState = {
    count: 0,
    search: false,
    results: false,
    token: false,
    isFetching: false,
    sessionid:false
}
const apikey = 'f3908e54ee28cf7e6fdd65636949dee0';
const tokenBase = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';
const baseApi = 'https://api.themoviedb.org/3/search/movie?api_key=';
const sessionBase = 'https://api.themoviedb.org/3/authentication/session/new?api_key=';

export default (state = initialState, action) => {

    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                isFetching: true
            }
        case TOKEN_FOUND:
            return {
                ...state,
                isFetching: false,
                token: action.payload
            }
        case GET_SESSION:
            return {
                ...state,
                isFetching: true
            }
        case SESSION_FOUND:
            return {
                ...state,
                isFetching: false,
                sessionid: action.payload
            }

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
                search: true
            }
        default:
            return state
    }
}

export const getToken = () => {
    return dispatch => {
        dispatch({
            type: GET_TOKEN,
            payload: axios.get(`${tokenBase}${apikey}`).then(res => {
                const url = 'https://www.themoviedb.org/authenticate/';                
                window.location.href = `${url}${res.data.request_token}?redirect_to=http://localhost:3000/my-profile/approved`;
            })
        })
    }
}

export const getSession = (auth) => {
    return dispatch => {
        dispatch({
            type: GET_SESSION,
            payload: axios.get(`${sessionBase}${apikey}&request_token=${auth}`).then(res => {
                dispatch({
                    type: SESSION_FOUND,
                    payload: res.data
                })
            })
        })
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