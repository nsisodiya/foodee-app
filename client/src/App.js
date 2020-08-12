import PropTypes from 'prop-types';
import React, { Component } from 'react';
//import { AppRouter } from './router/AppRouter';

export class App extends Component {
  render() {
    // const { name } = this.props;
    return (
      <>
        <h1>Toptal Assignment</h1>
        <div className='md:flex bg-white rounded-lg p-6'>
          <div className='text-center md:text-left'>
            <h2 className='text-lg'>Erin Lindford</h2>
            <div className='text-purple-500'>Product Engineer</div>
            <div className='text-gray-600'>erinlindford@example.com</div>
            <div className='text-gray-600'>(555) 765-4321</div>
          </div>
        </div>
      </>
    );
  }
}
App.propTypes = {
  name: PropTypes.string
};
