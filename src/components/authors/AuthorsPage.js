import React,  { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AuthorList from "./AuthorList";
import AuthorForm from "./AuthorForm";
import * as authorActions from "../../redux/actions/authorActions";
import { newAuthor } from "../../../tools/mockData";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import * as courseActions from "../../redux/actions/courseActions";

function AuthorsPage({authors, courses, loadAuthors, createAuthor, deleteAuthor, loadCourses, ...props}) {

    // Set local state
    const [author, setAuthor] = useState( {...props.newAuthor} );
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});


    // TODO: Courses state in this component needs to reload when someone changes courses on another tab.
    // Need to use some other middleware
    useEffect(() => {
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }
    }, [authors, courses]);

    function handleChange(event) {
        setAuthor({ ...props.newAuthor,
            [event.target.name]: event.target.value});
    }

    async function handleCreateAuthor(event) {
        event.preventDefault();
        setAdding(true);
        await createAuthor(author).then(()=> {
            toast.success("Author Added");
            setAdding(false);
            setAuthor({...props.newAuthor});
        }).catch(error => {
            setAdding(false);
            setErrors({ onSave: error.message });
        });
    }

    async function validateAuthorDelete(authorToDelete) {
        // Get the current author id's being allocated to current courses - these ones are blacklisted from being deleted
        let blackListAuthors = [];
        let blackListId = [];
        courses.forEach(function (course) {
            if (!blackListId.includes(course.authorId)) {
                blackListAuthors.push({'id': course.authorId});
                blackListId.push(course.authorId);
            }
        });

        // Get names of authors on the blackListAuthors array
        let merged = [];
        for(let i=0; i<blackListAuthors.length; i++) {
            merged.push({
                ...blackListAuthors[i],
                ...(authors.find((itmInner) => itmInner.id === blackListAuthors[i].id))}
            );
        }

        // If the current author name exists in a course, don't let user delete.
        const res = new Promise(resolve => {
            let bool = true;
            merged.forEach(element => {
                if (element.name === authorToDelete.name) {
                    bool = false;
                }
            });
            return resolve(bool);
        });

        return await res;
    }

    async function handleDeleteAuthor(authorToDelete) {
        // Check if author is assigned to a course before deleting
        if (await validateAuthorDelete(authorToDelete)) {
            toast.success("Author deleted");
            try {
                await deleteAuthor(authorToDelete);
            } catch (error) {
                toast.error("Delete failed. " + error.message, { autoClose: false });
            }
        } else {
            toast.error("Delete failed. Author is occupied.");
        }

    }

    return authors.length === 0 ? (
        <Spinner/>
        ) : (
        <>
        <AuthorList
            authors={authors}
            onDeleteAuthor={handleDeleteAuthor}
        />
        
        <AuthorForm
            onCreateAuthor={handleCreateAuthor}
            onChange={handleChange}
            adding={adding}
            author={author}
        />
        </>
    )
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    newAuthor: PropTypes.object.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    createAuthor: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired,
};

// Decides what data gets exposed to the component
function mapStateToProps(state) {
    return {
        authors: state.authors,
        newAuthor : newAuthor,
        courses: state.courses,
    }
}

// Specify the actions we would like to pass in as props
const mapDispatchToProps = {
    loadAuthors: authorActions.loadAuthors,
    createAuthor: authorActions.createAuthor,
    deleteAuthor: authorActions.deleteAuthor,
    loadCourses: courseActions.loadCourses,
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);