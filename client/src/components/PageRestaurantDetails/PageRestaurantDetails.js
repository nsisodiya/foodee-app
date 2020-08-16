import React from 'react';
//import css from 'css-template';
import PropTypes from 'prop-types';
//import styled from 'styled-components';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './PageRestaurantDetails.styled';

// Open - http://localhost:1234/components/page-restaurant-details
// Open - http://localhost:6006/?path=/story/components-pagerestaurantdetails--normal

const filePath = `/src/components/PageRestaurantDetails/PageRestaurantDetails.js`;

export const PageRestaurantDetails = function () {
  return (
    <Container data-file={filePath}>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={PageRestaurantDetails.displayName} filePath={filePath} />
    </Container>
  );
};

PageRestaurantDetails.displayName = 'PageRestaurantDetails';
PageRestaurantDetails.testProps = [
  {
    id: 'xyz'
  }
];
PageRestaurantDetails.propTypes = {
  id: PropTypes.string
};
