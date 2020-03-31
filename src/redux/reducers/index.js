import { combineReducers} from "redux";
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from "./apiStatusReducer"

// combines all reduces together
const rootReducer = combineReducers({
    courses: courses,
    authors: authors,
    apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;