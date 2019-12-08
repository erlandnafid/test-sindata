import { createStore, combineReducers, compose } from 'redux'
import mainReducer from './reducers/main'

const rootReducer = combineReducers({
    main: mainReducer
})
const composeEnhancers = compose
const configureStore = () => {
    return createStore(rootReducer, composeEnhancers())
}

export default configureStore
