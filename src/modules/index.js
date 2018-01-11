import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import profile from './profile'

export default combineReducers({
    routing: routerReducer,
    counter,
    profile
})