import React from "react";
import PropTypes from "prop-types";

const AuthorList = ({authors, onDeleteAuthor}) =>  (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>Author</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {authors.map(author => {
                    return (
                        <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteAuthor(author)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );


AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onDeleteAuthor: PropTypes.func.isRequired,
};

export default AuthorList;