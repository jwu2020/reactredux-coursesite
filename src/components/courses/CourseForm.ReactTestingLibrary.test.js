import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";
import {shallow} from "enzyme";

afterEach(cleanup);

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {},
    }

    const props = { ...defaultProps, ...args};
    return render(<CourseForm {...props} />)
}

it("Should render Add Course Header", () => {
    const {getByText } = renderCourseForm();
    getByText("Add Course");
});


it("Should label save button as Save when not saving", () => {
    const {getByText } = renderCourseForm();
    getByText("Save");
});

it("Should label save button as Saving... when  saving", () => {
    const {getByText } = renderCourseForm({saving: true});
    getByText("Saving...");
});