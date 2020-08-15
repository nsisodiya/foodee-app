import React from 'react';
//import css from 'css-template';
import PropTypes from 'prop-types';
//import styled from 'styled-components';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './PageAddRestaurant.styled';

// Open - http://localhost:1234/components/page-add-restaurant
// Open - http://localhost:6006/?path=/story/components-pageaddrestaurant--normal

const filePath = `/src/components/PageAddRestaurant/PageAddRestaurant.js`;

export const PageAddRestaurant = function ({ id }) {
  return (
    <Container data-file={filePath}>
      <div className='p-1 color-green-600'>PageAddRestaurant {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={PageAddRestaurant.displayName} filePath={filePath} />
    </Container>
  );
};

PageAddRestaurant.displayName = 'PageAddRestaurant';
PageAddRestaurant.testProps = [
  {
    id: 'xyz'
  }
];
PageAddRestaurant.propTypes = {
  id: PropTypes.string
};
