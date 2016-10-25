import expect from 'expect';
import * as authorActions from './authorActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/authors')
        //   .reply(200, { body: { author: [{ id: 1, firstName: 'Vitor', lastName: 'Seiji'}] }});

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{id: 'clean-code', title: 'Clean Code'}]}}
        ];

        const store = mockStore({authors: []}, expectedActions);
        store.dispatch(authorActions.loadAuthors()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
            done();
        });
    });

    it('should not allow delete authors associated with courses', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/authors')
        //   .reply(200, { body: { author: [{ id: 1, firstName: 'Vitor', lastName: 'Seiji'}] }});

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{firstName: 'Vitor', lastName: 'Iwamura'}]}}
        ];

        const store = mockStore({courses: [{id: ''}]}, expectedActions);
        store.dispatch(authorActions.deleteAuthor(''))
            .then(() => {})
            .catch(error => {
                expect(error).toEqual('There are courses associated with this author');
        });
        done();
    });
});