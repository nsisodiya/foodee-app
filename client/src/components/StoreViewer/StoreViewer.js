import JSONViewer from 'react-json-viewer';
import PropTypes from 'prop-types';
import React from 'react';
import css from 'css-template';
import { connect } from 'react-redux';

import { DevLinks } from '..';
import { Container } from './StoreViewer.styled';

// const Counter = ...

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/store-viewer
// Open - http://localhost:6006/?path=/story/components-storeviewer--normal

const filePath = `/src/components/StoreViewer/StoreViewer.js`;
//const storeName = 'PropertiesStore';

const mapStateToProps = (state, { storeName }) => {
  return {
    [storeName]: state[storeName]
  };
};

const mapDispatchToProps = {};

const StoreViewerFun = function (props) {
  const storeData = props[props.storeName];
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>StoreViewer - {props.storeName}</div>
      <div style={{ overflow: 'auto' }}>
        <JSONViewer json={storeData} />
      </div>
      <DevLinks displayName={'StoreViewer'} filePath={filePath} />
    </Container>
  );
};
export const StoreViewer = connect(mapStateToProps, mapDispatchToProps)(StoreViewerFun);

StoreViewer.displayName = 'StoreViewer';
StoreViewer.testProps = [];
StoreViewerFun.propTypes = {
  storeName: PropTypes.string
};
