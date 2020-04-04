import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";


function Header({courses}) {
    const activeStyle = { color: "#F15B2A" };
    const [numCourses, setNumCourses] = useState(0);


    useEffect(() => {
        setNumCourses(courses.length);
    },[courses]);

    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact> Home</NavLink>
            {" | "}
            <NavLink to="/courses" activeStyle={activeStyle}>Courses [{numCourses}]</NavLink>
            {" | "}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </nav>
    );
}


Header.propTypes = {
    courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses()
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
