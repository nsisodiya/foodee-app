import React from 'react';
import css from 'css-template';
import loopObject from 'loopobject';
import { DevLinks, StoreViewer } from '..';
import { rootStore } from '../../domless/stores/rootStore';
import { Container } from './AllStores.styled';

const mtop30 = css`
  margin-top: 30px;
  margin-left: 30px;
`;

// Open - http://localhost:1234/components/all-stores
// Open - http://localhost:6006/?path=/story/components-allstores--normal

const filePath = `/src/components/AllStores/AllStores.js`;

export const AllStores = function () {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>All Stores</div>
      {loopObject(rootStore, (s) => (
        <StoreViewer key={s.namespace} storeName={s.namespace} />
      ))}

      <DevLinks displayName={AllStores.displayName} filePath={filePath} />
    </Container>
  );
};

AllStores.displayName = 'AllStores';
AllStores.testProps = [];
AllStores.propTypes = {};
