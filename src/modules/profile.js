const initialState = {
    count: 0,
    search: false,
    results: false
}

export default (state = initialState, action) => {

    switch (action.type) {
        case 'GET_MOVIE':
            return {
                ...state,
                results: action.payload
            }
        default:
            return state
    }
}

export const getMovie = () => {
    return dispatch => {
        dispatch({
            type: 'GET_MOVIE',
            payload: ''
        })
    }
}