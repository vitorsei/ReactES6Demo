import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, courses, authors}) => {
    return (
        <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/courses" activeClassName="active">Courses ({courses.length})</Link></li>
                    <li><Link to="/authors" activeClassName="active">Authors ({authors.length})</Link></li>
                    <li><Link to="/about" activeClassName="active">About</Link></li>
                </ul>
            </div>
        </nav>
        {loading && <LoadingDots interval={100} dots={20}/>}
        </div>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
};

export default Header;
