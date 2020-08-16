import React from 'react';
import css from 'css-template';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import { DevLinks } from '../DevLinks/DevLinks';
import { Rows } from '../../css/Layout';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { generateFormItem } from '../forms/generateFormItem';

const { Container } = {
  Container: styled.div`
    position: relative;
    width: 558px;
    background: white;
    padding: 14px;
    border-radius: 5px;
  `
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
// Open - http://localhost:1234/components/add-review-box
// Open - http://localhost:6006/?path=/story/components-addreviewbox--normal

const filePath = `/src/components/AddReviewBox/AddReviewBox.js`;

export const AddReviewBox = function ({ restaurant }) {
  actions.AddReviewStore.editFormField('restaurant', restaurant);
  return (
    <Container data-file={filePath}>
      <StoreConnector
        storeName='AddReviewStore'
        connectTo={(state) => {
          return (
            <>
              <Rows>
                <Form {...layout} name='basic'>
                  {generateFormItem(state, 'rating', actions.AddReviewStore)}
                  {generateFormItem(state, 'comment', actions.AddReviewStore)}
                  <Button
                    style={css`
                      width: min-content;
                    `}
                    onClick={() => {
                      actions.AddReviewStore.addReview();
                    }}
                    disabled={!state.isFormValid}
                    type='primary'>
                    {state.submitBtnText}
                  </Button>
                </Form>
              </Rows>
            </>
          );
        }}
      />
      <DevLinks displayName={AddReviewBox.displayName} filePath={filePath} />
    </Container>
  );
};

AddReviewBox.displayName = 'AddReviewBox';
AddReviewBox.testProps = [
  {
    restaurant: '5f35ae3fcc6fe94c50783090'
  }
];
AddReviewBox.propTypes = {
  restaurant: PropTypes.String
};
