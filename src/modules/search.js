import {API_KEY} from './config'
import axios from 'axios'


export const SEARCHING = 'search/SEARCHING' 
export const SEARCHING_END = 'search/SEARCHING_END'
const search_str = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`
const end_str = '&language=en-US&query={}&page=1&include_adult=false'
const initState = {
    searching:false,
    value:false,
    results:false
}

export default (state = initState, action) => {
    switch (action.type) {
        case SEARCHING:
            return {
                ...state,
                searching: true
            }
        case SEARCHING_END:
            return {
                ...state,
                searching: false,
                results: action.payload
            }
        default:
            return state
    }
}

export const startSearch = (value) => {
    return dispatch => {
        console.log(API_KEY)
        const query = end_str.replace('{}', encodeURI(value))
        dispatch({
            type: SEARCHING,
            payload:axios.get(`${search_str}${query}`).then(res => {
                dispatch({
                    type: SEARCHING_END,
                    payload: res.data
                })
            })
        })
    }
}