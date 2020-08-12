import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import { Container } from './Rating.styled';
import { DevLinks } from '../DevLinks/DevLinks';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/rating
// Open - http://localhost:6006/?path=/story/components-rating--normal

const filePath = `/src/components/Rating/Rating.js`;

export const Rating = function ({ val }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>Rating is {val}</div>
      <DevLinks displayName={Rating.displayName} filePath={filePath} />
    </Container>
  );
};

Rating.displayName = 'Rating';
Rating.testProps = [
  {
    val: 3
  },
  {
    val: 1
  },
  {
    val: 5
  }
];
Rating.propTypes = {
  val: PropTypes.number
};
