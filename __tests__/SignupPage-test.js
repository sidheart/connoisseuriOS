import 'react-native';
import React from 'react';
import SignupPage from './SignupPage';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <SignupPage />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

