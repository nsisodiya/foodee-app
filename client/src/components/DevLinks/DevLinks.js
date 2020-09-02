import PropTypes from 'prop-types';
import React from 'react';
import { paramCase } from 'change-case';
import codeIcon from '../../icons/code.svg';
import { ExternalLink } from '../ExternalLink/ExternalLink';

export const DevLinks = function ({ displayName, filePath }) {
  const url = `/components/${paramCase(displayName)}`;

  if (localStorage.getItem('devlinks') !== 'true') {
    return null;
  }
  return (
    <div className='flex top-0 right-0 p-1 absolute bg-yellow-200 border border-gray-900 rounded'>
      <a
        className='p-1'
        rel='noopener noreferrer'
        target='_blank'
        href={`vscode://file/${window.projectPath}${filePath}`}>
        <img className='w-4' src={codeIcon} />
      </a>
      <ExternalLink className='p-1' url={url} />
    </div>
  );
};
DevLinks.displayName = 'DevLinks';
DevLinks.propTypes = {
  displayName: PropTypes.string,
  filePath: PropTypes.string
};
