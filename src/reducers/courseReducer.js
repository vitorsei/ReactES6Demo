import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    function sortCourseByTitle(courses) {
        courses.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
    }

    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
        {
            sortCourseByTitle(action.courses);
            return action.courses;
        }

        case types.CREATE_COURSE_SUCCESS: {
            let courses = [
                ...state,
                Object.assign({}, action.course)
            ];

            sortCourseByTitle(courses);
            return courses;
        }

        case types.UPDATE_COURSE_SUCCESS: {
            let courses = [
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];

            sortCourseByTitle(courses);
            return courses;
        }

        case types.DELETE_COURSE_SUCCESS: {
            let index = state.findIndex(course => course.id !== action.courseId);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        }

        default:
            return state;
    }
}
