import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import profile from './profile'
import search from './search'
import about from './about'

export default combineReducers({
    routing: routerReducer,
    counter,
    profile,
    search,
    about
})