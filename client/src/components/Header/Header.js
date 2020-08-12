import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './Header.styled';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/header
// Open - http://localhost:6006/?path=/story/components-header--normal

const filePath = `/src/components/Header/Header.js`;

export const Header = function ({ id }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>Header {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={Header.displayName} filePath={filePath} />
    </Container>
  );
};

Header.displayName = 'Header';
Header.testProps = [
  {
    id: 'xyz'
  }
];
Header.propTypes = {
  id: PropTypes.string
};
