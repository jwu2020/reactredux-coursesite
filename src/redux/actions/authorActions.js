import * as types from "./actionTypes"
import * as courseApi from "../../api/authorApi"
import {apiCallError, beginApiCall} from "./apiStatusActions";

export function loadAuthorSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors: authors
    }
}
//
// export function deleteAuthorOptimistic(author) {
//     return {
//         type: types.DELETE_AUTHOR_OPTIMISTIC,
//         author: author
//     }
// }

export function addAuthorSuccess(author) {
    return {
        type: types.CREATE_AUTHOR_SUCCESS,
        author: author
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

export function createAuthor(author) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return courseApi.createAuthor(author).then(author => {
            dispatch(addAuthorSuccess(author));
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        });

    }
}

// export function deleteAuthor(author) {
//     return function (dispatch) {
//         dispatch(deleteAuthorOptimistic(author));
//         return courseApi.deleteAuthor(author.id);
//     }
// }