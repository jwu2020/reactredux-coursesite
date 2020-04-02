import React from "react";
import PropTypes from "prop-types";

const AuthorForm = ({author, onCreateAuthor, onChange, adding}) => {

    return (
            <form onSubmit={onCreateAuthor}>
                <label>
                    Add Author
                    <input
                        className="form-control"
                        type="text"
                        label="Add Author"
                        name="name"
                        onChange={onChange}
                        value={author.name}
                    />
                </label>

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