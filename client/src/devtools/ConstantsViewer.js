import JSONViewer from 'react-json-viewer';
import PropTypes from 'prop-types';
import React from 'react';

export const ConstantsViewer = function ({ data, name }) {
  return (
    <div className='absolute flex flex-col m-2 bg-yellow-100 rounded-lg border border-gray-700'>
      <span className='p-3 font-bold bg-blue-100 border rounded-lg rounded-b-none'>{name}</span>
      <div className='p-3 rounded-lg rounded-t-none'>
        <JSONViewer json={data} />
      </div>
    </div>
  );
};

ConstantsViewer.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object
};
