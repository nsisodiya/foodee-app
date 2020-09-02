import React from 'react';
import { RestaurantWidget } from './RestaurantWidget';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/RestaurantWidget',
  component: RestaurantWidget
};

// Open - http://localhost:6006/?path=/story/components-restaurantwidget--normal

export const normal = () => <RestaurantWidget />;
