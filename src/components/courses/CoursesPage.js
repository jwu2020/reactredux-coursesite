import React, { useEffect, useState }  from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import {Link, Redirect} from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import TextInput from "../common/TextInput";
import Pagination from "../common/Pagination";

function CoursesPage({authors, courses, loading, loadCourses, loadAuthors, deleteCourse}) {

    const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
    const [redirectToAuthorPage, setRedirectToAuthorPage] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    // Get current posts
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Filter variables
    const [query, setQuery] = useState('');
    const [filterCourses, setFilterCourses] = useState([...courses].slice(indexOfFirstPost, indexOfLastPost));

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
            setFilterCourses([...courses]);
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }

        setFilterCourses([...courses]);
        indexOfLastPost = currentPage * postsPerPage;
        indexOfFirstPost = indexOfLastPost - postsPerPage;
        setFilterCourses([...courses].slice(indexOfFirstPost, indexOfLastPost));

    },[currentPage]);


    async function handleDeleteCourse  (course) {
        toast.success("Course deleted");
        try {
            await deleteCourse(course);
        } catch (error) {
            console.log("course failed but we know the course is: ", course);
            toast.error("Delete failed. " + error.message, { autoClose: false });
        }
    }


    function handleSearch(event) {
        event.preventDefault();
        console.log("query is: ", query.name);
        if (query.name == undefined || query.name === "") {
            console.log("query name: ", query.name);
            setFilterCourses([...courses].slice(0,5));
        } else {
            setFilterCourses(courses.filter(c => {
                console.log(c.title, ', ', query.name);
                return (c.title.indexOf(query.name) !== -1)
            }));
        }
    }

    async function handleQuery(event) {
        const { name, value } = event.target;
        setQuery(query => ({
            ...query,
            [name]: value
        }));
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <>
            {redirectToAddCoursePage && <Redirect to="/course" />}
            {redirectToAuthorPage && <Redirect to="/authors" />}
            <h2>Courses</h2>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary add-course"
                        onClick={() => setRedirectToAddCoursePage(true)}
                    >
                        Add Course
                    </button>

                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary author-info"
                        onClick={() => setRedirectToAuthorPage(true)}
                    >
                        Author Administration
                    </button>

                    <form onSubmit={handleSearch} >
                        <TextInput
                            label="Filter Courses by Title"
                            type="text"
                            name="name"
                            onChange={handleQuery}
                        />
                    </form>

                    <CourseList
                        onDeleteClick={handleDeleteCourse}
                        filteredCourses={filterCourses.length!==0? filterCourses: courses.slice(indexOfFirstPost, indexOfLastPost)}
                    />

                    <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={courses.length}
                    paginate={paginate}
                />

                </>
            )}
        </>
    );
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    };
                }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {
        loadCourses: courseActions.loadCourses,
        loadAuthors: authorActions.loadAuthors,
        deleteCourse: courseActions.deleteCourse,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesPage);
