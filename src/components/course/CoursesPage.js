import  React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import  {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            deleting: false
        };

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    deleteCourse(event) {
        if (!confirm('Are you sure you want to delete the course?'))
            return;

        if (this.state.deleting)
            return;

        const deleteCourseId = event.currentTarget.value;

        this.setState({deleting: true});

        this.props.actions.deleteCourse(deleteCourseId)
            .then(() => {
                this.setState({deleting: false});
                toastr.success('Course deleted');
            })
            .catch(error => {
                this.setState({deleting: false});
                toastr.error(error);
            });
    }

    render() {
        const {courses} = this.props;
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                       value="Add Course"
                       className="btn btn-primary"
                       onClick={this.redirectToAddCoursePage}/>
                {courses.length === 0 ? null : <CourseList courses={courses} onDelete={this.deleteCourse}/>}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


function sortCourses(courses) {
    let sortedCourses = Object.assign([], courses);
    return sortedCourses.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
}

function mapStateToProps(state, ownProps) {

    const sortedCourses = sortCourses(state.courses);

    //returns the properties that we would like to see exposed on our components
    return {
        // this will be accessed above as this.props.courses
        courses: sortedCourses //comes from the rootReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
