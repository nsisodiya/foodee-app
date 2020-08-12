import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './PageLogin.styled';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/page-login
// Open - http://localhost:6006/?path=/story/components-pagelogin--normal

const filePath = `/src/components/PageLogin/PageLogin.js`;

export const PageLogin = function ({ id }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>PageLogin {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={PageLogin.displayName} filePath={filePath} />
    </Container>
  );
};

PageLogin.displayName = 'PageLogin';
PageLogin.testProps = [
  {
    id: 'xyz'
  }
];
PageLogin.propTypes = {
  id: PropTypes.string
};
