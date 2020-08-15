import JSONViewer from 'react-json-viewer';
import PropTypes from 'prop-types';
import React from 'react';
import css from 'css-template';
import { iff } from '../../utils/iff';
import { Container } from './SimpleComponentViewer.styled';

// Open - http://localhost:1234/components/simple-component-viewer
// Open - http://localhost:6006/?path=/story/components-simplecomponentviewer--normal

const filePath = `/src/components/SimpleComponentViewer/SimpleComponentViewer.js`;
const box = css`
  margin: 10px;
`;
export const SimpleComponentViewer = function ({ comp }) {
  return (
    <Container data-file={filePath} className='p-3 m-1 border bg-gray-400 rounded-lg'>
      <div className='p-1 color-green-600'>Component Viewer - {comp.displayName}</div>
      {iff(
        comp.testProps !== undefined &&
          Array.isArray(comp.testProps) &&
          comp.testProps.length !== 0,
        () => {
          return comp.testProps.map((prp, i) => {
            return (
              <div className='flex flex-col' key={i} style={box}>
                <div className='p-4 border border-blue-400'>{comp(prp)}</div>
                <div style={{ overflow: 'auto' }} className='p-4 m-5 bg-white'>
                  <JSONViewer json={prp} />
                </div>
              </div>
            );
          });
        },
        () => {
          return (
            <>
              <div className='flex flex-col' style={box}>
                <div>{comp()}</div>
                <div style={{ overflow: 'auto' }} className='p-4 m-5 bg-white'>
                  <JSONViewer json={{}} />
                </div>
              </div>
            </>
          );
        }
      )}
    </Container>
  );
};
SimpleComponentViewer.displayName = 'SimpleComponentViewer';
SimpleComponentViewer.propTypes = {
  comp: PropTypes.any
};
