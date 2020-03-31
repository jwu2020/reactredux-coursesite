import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi"
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses:courses };
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
    }
}

export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course: course
    }
}

export function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}


// Thunks
export function loadCourses() {
    // Calling function will be same for async and sync calls
    return function(dispatch) {
        dispatch(beginApiCall());
        // response returns list of courses
        return courseApi.getCourses().then( courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}


export function saveCourse(course) {
    return function(dispatch, getState) {
        dispatch(beginApiCall());

        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function deleteCourse(course) {
    return function (dispatch) {

        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    }
}