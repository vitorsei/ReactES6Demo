import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';

describe('Store', function() {
    // arrange
    const store = createStore(rootReducer, initialState);


    it('Should handle creating courses', function() {
        const course = {
            title: "Clean Code"
        };

        // act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        // assert
        const actual = store.getState().courses[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });

    it('Should handle creating authors', function() {
        const author = {
            firstName: "Vitor"
        };

        // act
        const action = authorActions.createAuthorSuccess(author);
        store.dispatch(action);

        // assert
        const actual = store.getState().authors[0];
        const expected = {
            firstName: "Vitor"
        };

        expect(actual).toEqual(expected);
    });
});
