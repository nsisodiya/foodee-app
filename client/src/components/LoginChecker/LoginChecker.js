import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './LoginChecker.styled';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/login-checker
// Open - http://localhost:6006/?path=/story/components-loginchecker--normal

const filePath = `/src/components/LoginChecker/LoginChecker.js`;

export const LoginChecker = function ({ id }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>LoginChecker {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={LoginChecker.displayName} filePath={filePath} />
    </Container>
  );
};

LoginChecker.displayName = 'LoginChecker';
LoginChecker.testProps = [
  {
    id: 'xyz'
  }
];
LoginChecker.propTypes = {
  id: PropTypes.string
};
