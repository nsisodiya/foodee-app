import PropTypes from 'prop-types';
import React from 'react';
// import css from 'css-template';
import { connect } from 'react-redux';
import { Container } from './StoreConnector.styled';
// Open - http://localhost:1234/components/store-connector
// Open - http://localhost:6006/?path=/story/components-storeconnector--normal

const filePath = `/src/components/StoreConnector/StoreConnector.js`;
const mapStateToProps = (state, { storeName }) => {
  return {
    [storeName]: state[storeName]
  };
};

const mapDispatchToProps = {};

const StoreConnectorFun = function (props) {
  const storeData = props[props.storeName];
  return <Container data-file={filePath}>{props.connectTo(storeData)}</Container>;
};

export const StoreConnector = connect(mapStateToProps, mapDispatchToProps)(StoreConnectorFun);

StoreConnector.displayName = 'StoreConnector';
StoreConnectorFun.propTypes = {
  storeName: PropTypes.string,
  connectTo: PropTypes.func
};
