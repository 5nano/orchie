import { shallow } from 'enzyme';
import mockAxios from 'axios';
import React from 'react';
import App from './index.js.js';

jest.mock('axios');

describe('App', () => {
    const mockedDoc = { name: 'someName.png', size: 200 };

    beforeEach(() => {
        mockAxios.get.mockResolvedValue([]);
    })

  it('renders correctly with no docs', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with docs in it', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ docs: [mockedDoc] });
    expect(wrapper).toMatchSnapshot();
  });
});