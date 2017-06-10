import 'react-native';
import React from 'react';
import RegisterPage from './RegisterPage';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <RegisterPage />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});