import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false,
            dirty: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty) {
                return 'Your work is not saved! Are you sure you want to leave?';
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.course.id == ''){
            this.context.router.push('/notFound');
        }

        if (this.props.course.id != nextProps.course.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        this.setState({dirty: true});
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        if (this.state.course.category.length < 5) {
            errors.category = 'Category must be at least 5 characters.';
            formIsValid = false;
        }

        if (this.state.course.length.length == 0) {
            errors.length = "Length can't must be empty.";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }


    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true, dirty: false});

        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    route: React.PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course) return course[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path `/course/:id`

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
        if (course == null) {
            course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
        }
    }

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);


