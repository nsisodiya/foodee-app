import React from 'react';
//import css from 'css-template';
// import PropTypes from 'prop-types';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { H1 } from '../../css/common.styled';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { Rows, RowSpacer } from '../../css/Layout';
import { RestaurantWidget } from '../RestaurantWidget/RestaurantWidget';
import { formUtil } from '../../domless/stores/formUtil';
import { generateField, generateSubmitButton } from '../forms/generateFormItem';
import { Container } from './PageAddRestaurant.styled';
// Open - http://localhost:1234/components/page-add-restaurant
// Open - http://localhost:6006/?path=/story/components-pageaddrestaurant--normal

const filePath = `/src/components/PageAddRestaurant/PageAddRestaurant.js`;

export const PageAddRestaurant = function () {
  return (
    <Container data-file={filePath} className='p-3 bg-white'>
      <StoreConnector
        storeName='AddRestaurantStore'
        connectTo={(state) => {
          return (
            <>
              <Rows centered>
                <H1>Add Restaurant</H1>
                <RestaurantWidget {...formUtil.getCurrentFormValue(state)} />
                <RowSpacer>50</RowSpacer>
                <div
                  style={css`
                    width: 50%;
                  `}>
                  {generateField(state, 'name', actions.AddRestaurantStore)}
                  {generateField(state, 'address', actions.AddRestaurantStore)}
                  {generateField(state, 'cuisines', actions.AddRestaurantStore)}
                  {generateField(state, 'imageurl', actions.AddRestaurantStore)}
                  {generateField(state, 'hours', actions.AddRestaurantStore)}
                  {generateField(state, 'website', actions.AddRestaurantStore)}
                  {generateField(state, 'phone', actions.AddRestaurantStore)}
                  {generateSubmitButton(state, actions.AddRestaurantStore)}
                </div>
              </Rows>

              <DevLinks displayName={PageAddRestaurant.displayName} filePath={filePath} />
            </>
          );
        }}
      />
    </Container>
  );
};

PageAddRestaurant.displayName = 'PageAddRestaurant';
PageAddRestaurant.testProps = [];
PageAddRestaurant.propTypes = {};
