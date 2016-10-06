import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {CoursesPage} from './CoursesPage';
import sinon from 'sinon';

describe('Courses Page', () => {
    it('sets deleting state when trying to delete course', () => {
        const props = {
            actions: {
                deleteCourse: () => {
                    return Promise.resolve();
                }
            },
            courses: [
                {id: '1', watchHref: '', title: 'A', authorId: '', length: '', category: ''}
            ]
        };
        const wrapper = mount(<CoursesPage {...props} />);
        const deleteButton = wrapper.find('button');

        expect(wrapper.state().deleting).toBe(false);

        const confirmStub = sinon.stub(global, 'confirm');
        confirmStub.returns(true);

        deleteButton.simulate('click');

        expect(wrapper.state().deleting).toBe(true);
        expect(confirmStub.callCount).toBe(1);
        confirmStub.restore();
    });

    it('calls redirectToAddCoursePage after adding course', () => {
        CoursesPage.prototype.redirectToAddCoursePage =  () => {
            return Promise.resolve();
        };

        let spy = sinon.spy(CoursesPage.prototype, 'redirectToAddCoursePage');

        const props = {
            actions: {
                deleteCourse: () => {
                    return Promise.resolve();
                }
            },
            courses: [
                {id: '1', watchHref: '', title: 'A', authorId: '', length: '', category: ''}
            ]
        };
        const wrapper = mount(<CoursesPage {...props} />);
        const addCourse = wrapper.find('input');
        expect(addCourse.prop('type')).toBe('submit');
        addCourse.simulate('click');
        expect(spy.callCount).toBe(1);
    });
});