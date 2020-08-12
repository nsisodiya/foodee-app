import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppRouter } from './router/AppRouter';
import { Tag } from 'antd';
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

function oldCode() {
  return (
    <>
      <h1>TailwindCSS</h1>
      <div className='md:flex bg-white rounded-lg p-6'>
        <div className='text-center md:text-left'>
          <h2 className='text-lg'>Erin Lindford</h2>
          <div className='text-purple-500'>Product Engineer</div>
          <div className='text-gray-600'>erinlindford@example.com</div>
          <div className='text-gray-600'>(555) 765-4321</div>
        </div>
      </div>
      <h1>AndD</h1>

      <div>
        <Tag icon={<TwitterOutlined />} color='#55acee'>
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color='#cd201f'>
          Youtube
        </Tag>
        <Tag icon={<FacebookOutlined />} color='#3b5999'>
          Facebook
        </Tag>
        <Tag icon={<LinkedinOutlined />} color='#55acee'>
          LinkedIn
        </Tag>
      </div>
    </>
  );
}
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
