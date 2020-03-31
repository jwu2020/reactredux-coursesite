import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
    // arrange
    const initialState = [
        {title: "A"},
        {title: "B"}
    ];

    const newCourse = {title: "C"};

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
});

it("should update a course when passed UPDATE_COURSE_SUCCESS", () => {
    // arrange
    const initialState = [
        {id: 1, title: "A"},
        {id: 2, title: "B"}
    ];

    const newCourse = {id: 1, title: "C"};

    const action = actions.updateCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == newCourse.id );
    const untouchedCourse = newState.find(a => a.id == 2);

    // assert
    expect(updatedCourse.title).toEqual("C");
    expect(untouchedCourse.title).toEqual("B")
});