import 'react-native';
import React from 'react';
import RestaurantView from './RestaurantView';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <RestaurantView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});