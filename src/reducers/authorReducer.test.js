import expect from 'expect';
import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

describe('Author Reducer', () => {
    it('should add author when passed CREATE_AUTHOR_SUCCESS', () => {
        // arrange
        const initialState = [
            {firstName: 'A', lastName: 'B'},
            {firstName: 'C', lastName: 'D'}
        ];

        const newAuthor = {firstName: 'E', lastName: 'F'};

        const action = actions.createAuthorSuccess(newAuthor);

        //act
        const newState = authorReducer(initialState, action);

        //assert
        expect(newState.length).toEqual(3);
        expect(newState[0].firstName).toEqual('A');
        expect(newState[1].firstName).toEqual('C');
        expect(newState[2].firstName).toEqual('E');
    });

    it('should update author when passed UPDATE_AUTHOR_SUCCESS', () => {
        // arrange
        const initialState = [
            {id:'1', firstName: 'A', lastName: 'B'},
            {id:'2', firstName: 'C', lastName: 'D'}
        ];

        const author = {id:'1', firstName: 'A', lastName: 'New Last Name'};
        const action = actions.updateAuthorSuccess(author);

        // act
        const newState = authorReducer(initialState, action);
        const updatedAuthor = newState.find(a => a.id == author.id);
        const untouchedAuthor = newState.find(a => a.id == '2');

        // assert
        expect(updatedAuthor.lastName).toEqual('New Last Name');
        expect(untouchedAuthor.lastName).toEqual('D');
        expect(newState.length).toEqual(2);
    });

    it('should delete author when passed DELETE_AUTHOR_SUCCESS', () => {
        // arrange
        const initialState = [
            {id:'1', firstName: 'A', lastName: 'B'},
            {id:'2', firstName: 'C', lastName: 'D'},
            {id:'3', firstName: 'E', lastName: 'F'},
        ];

        const authorId = '2';
        const action = actions.deleteAuthorSuccess(authorId);

        // act
        const newState = authorReducer(initialState, action);
        expect(newState.length).toEqual(2);
        expect(newState.find(x => x.id == authorId)).toEqual(undefined);

    });

    it('should not delete author if id does not exist', () => {
        // arrange
        const initialState = [
            {id:'1', firstName: 'A', lastName: 'B'},
            {id:'2', firstName: 'C', lastName: 'D'},
            {id:'3', firstName: 'E', lastName: 'F'},
        ];


        const authorId = '4';
        const action = actions.deleteAuthorSuccess(authorId);

        // act
        const newState = authorReducer(initialState, action);
        expect(newState.length).toEqual(3);
    });
});
