import React from "react";
import PropTypes from "prop-types";

const AuthorList = ({authors}) =>  (
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
                                    // onClick={() => onCreateAuthor(author)}
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
};

export default AuthorList;