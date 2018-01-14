import {API_KEY} from './config'
import axios from 'axios'

export const GET_DETAILS = 'search/DETAILS' 
export const DETAILS_END = 'search/DETAILS_END'
//https://api.themoviedb.org/3/tv/3936?api_key=f3908e54ee28cf7e6fdd65636949dee0
const path = `https://api.themoviedb.org/3/{1}/{2}?api_key=${API_KEY}`

const initState = {
    searching:false,
    value:false,
    results:false
}

export default (state = initState, action) => {
    switch (action.type) {
        case GET_DETAILS:
            return {
                ...state,
                searching: true
            }
        case DETAILS_END:
            return {
                ...state,
                searching: false,
                results: action.payload
            }
        default:
            return state
    }
}

export const getDetails = (type, id) => {
    return (dispatch) => {
        let query = path.replace('{1}', encodeURI(type))
        let final = query.replace('{2}',id)
        dispatch({
            type: GET_DETAILS,
            payload:axios.get(`${final}`).then(res => {
                dispatch({
                    type: DETAILS_END,
                    payload: res.data
                })
            })
        })
    }
}