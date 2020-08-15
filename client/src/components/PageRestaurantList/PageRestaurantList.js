import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './PageRestaurantList.styled';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/page-restaurant-list
// Open - http://localhost:6006/?path=/story/components-pagerestaurantlist--normal

const filePath = `/src/components/PageRestaurantList/PageRestaurantList.js`;

export const PageRestaurantList = function ({ id }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>PageRestaurantList {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={PageRestaurantList.displayName} filePath={filePath} />
    </Container>
  );
};

PageRestaurantList.displayName = 'PageRestaurantList';
PageRestaurantList.testProps = [
  {
    id: 'xyz'
  }
];
PageRestaurantList.propTypes = {
  id: PropTypes.string
};
