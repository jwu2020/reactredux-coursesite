import * as types from "./actionTypes"
import * as courseApi from "../../api/authorApi"
import {apiCallError, beginApiCall} from "./apiStatusActions";

export function loadAuthorSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: authors
    }
}



// Thunks
export function loadAuthors() {
    // Calling function will be same for async and sync calls
    return function(dispatch) {
        dispatch(beginApiCall());

        // response returns list of courses
        return courseApi.getAuthors().then( authors => {
            dispatch(loadAuthorSuccess(authors));
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}
