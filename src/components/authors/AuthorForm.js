import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorForm = ({author, onCreateAuthor, onChange, adding}) => {
    console.log("in form, author is: ", author);


    return (
            <form onSubmit={onCreateAuthor}>
                <input
                    type="text"
                    label="Add Author"
                    name="name"
                    onChange={onChange}
                    value={author.name}
               />
                <button
                    type="submit"
                    className="btn btn-info"
                    disabled={adding}
                >  {adding ? "Adding Author..." : "Add"} </button>
            </form>
    );
};

AuthorForm.propTypes = {
    onCreateAuthor: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    adding: PropTypes.bool,
    author: PropTypes.object
};


export default AuthorForm;