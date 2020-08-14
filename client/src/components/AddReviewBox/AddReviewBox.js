import React from 'react';
import css from 'css-template';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
import Rate from 'antd/es/rate';
import { DevLinks } from '../DevLinks/DevLinks';
import { Rows, RowSpacer } from '../../css/Layout';

const { Container } = {
  Container: styled.div`
    position: relative;
    width: 558px;
    background: white;
    padding: 14px;
    border-radius: 5px;
  `
};
// Open - http://localhost:1234/components/add-review-box
// Open - http://localhost:6006/?path=/story/components-addreviewbox--normal

const filePath = `/src/components/AddReviewBox/AddReviewBox.js`;

export const AddReviewBox = function () {
  return (
    <Container data-file={filePath}>
      <Rows>
        <Rate
          style={css`
            color: red;
          `}
          value={0}
        />
        <RowSpacer>20</RowSpacer>
        <input type='textarea' />
      </Rows>
      <DevLinks displayName={AddReviewBox.displayName} filePath={filePath} />
    </Container>
  );
};

AddReviewBox.displayName = 'AddReviewBox';
AddReviewBox.testProps = [{}];
AddReviewBox.propTypes = {};
