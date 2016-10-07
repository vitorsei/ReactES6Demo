import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

describe('Manage Author Page', () =>{
   it('sets error when trying to input invalid data', () =>{

       const props = {
           author: {firstName:'', lastName: ''},
           actions: {
               saveCourse: () => {
                   return Promise.resolve();
               }
           }
       };

       const context = { router: { setRouteLeaveHook: (a, b) => '' } };
       const wrapper = mount(<ManageAuthorPage {...props} />, {context});
       const saveButton = wrapper.find('input').last();
       expect(saveButton.prop('type')).toBe('submit');
       saveButton.simulate('click');
       expect(wrapper.state().errors.firstName).toBe('First Name must be at least 5 characters.');
       expect(wrapper.state().errors.lastName).toBe('Last Name must be at least 5 characters.');
   });
});
