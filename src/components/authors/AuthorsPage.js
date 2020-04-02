import React,  { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AuthorList from "./AuthorList";
import AuthorForm from "./AuthorForm";
import * as authorActions from "../../redux/actions/authorActions";
import { newAuthor } from "../../../tools/mockData";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

function AuthorsPage({authors, loadAuthors, createAuthor, ...props}) {

    // Set local state
    const [author, setAuthor] = useState( {...props.newAuthor} );
    const [adding, setAdding] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
    }, [authors, author]);

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

    return authors.length === 0 ? (
        <Spinner/>
        ) : (
        <>
        <AuthorList
            authors={authors}
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
    loadAuthors: PropTypes.func.isRequired,
    createAuthor: PropTypes.func.isRequired,
    newAuthor: PropTypes.object.isRequired,
};

// Decides what data gets exposed to the component
function mapStateToProps(state) {
    return {
        authors: state.authors,
        newAuthor : newAuthor
    }
}

// Specify the actions we would like to pass in as props
const mapDispatchToProps = {
    loadAuthors: authorActions.loadAuthors,
    createAuthor: authorActions.createAuthor,
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);