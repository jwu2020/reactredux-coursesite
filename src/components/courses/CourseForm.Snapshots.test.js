import React from 'react';
import CourseForm from "./CourseForm";
import renderer from 'react-test-renderer';
import { courses, authors } from "../../../tools/mockData";

it("Sets submit button label 'Saving...' when saving is true", () => {
    // Object which represents output of component
    const tree = renderer.create(<CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving
        />
    );


    expect(tree).toMatchSnapshot();
});

it("Sets submit button label 'Save' when saving is false", () => {
    // Object which represents output of component
    const tree = renderer.create(<CourseForm
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving={false}
        />
    );


    expect(tree).toMatchSnapshot();
});