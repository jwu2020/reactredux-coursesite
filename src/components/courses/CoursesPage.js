import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types';
import CourseList from './CourseList'
import { Redirect } from 'react-router-dom';
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';


class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    };

    // invoked immediately after a component is mounted (inserted into tree)
    componentDidMount() {
        const { courses, authors, loadCourses, loadAuthors } = this.props;

        // Loads courses
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }

        // Loads all authors
        if (authors.length === 0) {
           loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
    }

    handleDeleteCourse = async course => {
        toast.success("Course Deleted");
        try {
            this.props.deleteCourse(course)
        } catch(error) {
            toast.error("Delete failed. " + error.message, {autoClose: false});
        }
    };

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to={"/course" }/>}
                <h2>Courses</h2>
                {this.props.loading ?
                    <Spinner/> :
                    <>
                        <button
                            style={{marginBottom: 20}}
                            className={"btn btn-primary add-course"}
                            onClick={() => this.setState({redirectToAddCoursePage: true})}
                        > Add Course
                        </button>
                        < CourseList
                            onDeleteClick={this.handleDeleteCourse}
                            courses={this.props.courses}/>
                    </>
                }
            </>
        );
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    deleteCourse: PropTypes.func.isRequired,

};

// Decides what data gets exposed to the component
// Our component is now connected to the store / state as we set this up in the function
function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0
            ? []
            : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            };
        }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    }
}

// Injection action from courseactions to component via prop called actions
// Specify the actinos we would like to pass in as props
const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    deleteCourse: courseActions.deleteCourse,
    loadAuthors: authorActions.loadAuthors,
};

// Decides what actions we want to expose to the component
// When we omit it, our component gets a dispatch prop injected automatically.
// function mapDispatchToProps() {}

// Connect returns a function which then calls Courses page.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
