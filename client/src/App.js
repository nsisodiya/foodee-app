import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { AppRouter } from './router/AppRouter';

export class App extends Component {
  render() {
    return (
      <>
        <AppRouter />
      </>
    );
  }
}
App.propTypes = {
  name: PropTypes.string
};
