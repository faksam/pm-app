// react libraries
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { mount } from 'enzyme';

// components
import HomePage from './';

describe('The HomePage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <HomePage />
      </Router>);
  });

  it('should be render home page', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
