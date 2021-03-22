// react libraries
import * as React from 'react';

// third-party libraries
import { mount } from 'enzyme';

// components
import App from './';

describe('The App component', () => {
  let wrapper;
  let props = {
    auth: false,
  };

  it('should render the application with an un-authenticated user', () => {
    wrapper = mount(<App {...props} />);

    wrapper.find('.dropdown-button-account').first().simulate('click');

    expect(wrapper.find('a[href="/account"]')).toBeTruthy();
  });

  it('should render the application with an authenticated user', () => {
    props = {
      auth: true,
    };

    wrapper = mount(<App {...props} />);

    expect(wrapper.find('.dropdown-button-account').exists()).toBeTruthy();
  });
});
