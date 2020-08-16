import React from 'react';
//import css from 'css-template';
import PropTypes from 'prop-types';
import DeleteFilled from '@ant-design/icons/es/icons/DeleteFilled';
import { Tooltip, Button } from 'antd';

// Open - http://localhost:1234/components/delete
// Open - http://localhost:6006/?path=/story/components-delete--normal
import styled from 'styled-components';
import { getHeaders } from '../../domless/utils/getHeaders';
import { evtbus } from '../../utils/evtbus';
import { getUserInfo } from '../../utils/getUserInfo';
import { history } from '../../domless/utils/history';

const Container = styled.div`
  position: relative;
`;

const filePath = `/src/components/Delete/Delete.js`;
const callDeleteAPI = async ({ apiurl, id, signal, redirect }) => {
  await (
    await fetch(`${process.env.API_URL}${apiurl}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
  ).json();
  if (redirect) {
    const duration = 1000;
    setTimeout(() => {
      history.push(signal);
    }, duration);
  } else {
    evtbus.publish(signal);
  }
};
export const Delete = function ({ tooltip, apiurl, id, signal, redirect }) {
  const userinfo = getUserInfo();
  if (userinfo.role !== 'ADMIN') {
    return null;
  }
  return (
    <Container data-file={filePath}>
      <Tooltip title={tooltip}>
        <Button
          onClick={() => {
            callDeleteAPI({
              apiurl,
              id,
              signal,
              redirect
            });
          }}
          icon={<DeleteFilled style={{ color: 'red' }} />}
        />
      </Tooltip>
    </Container>
  );
};

Delete.displayName = 'Delete';
Delete.testProps = [
  {
    tooltip: 'Delete Comment',
    id: '5f39a92890c30318b7d5c1a5',
    apiurl: '/reviews',
    signal: 'NEW_COMMENT_ADDED'
  },
  {
    tooltip: 'Delete Restaurant',
    id: '5f35838768c5cd75b591cde3',
    apiurl: '/restaurants',
    signal: '/restaurants',
    redirect: true
  }
];
Delete.propTypes = {
  tooltip: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  apiurl: PropTypes.string.isRequired,
  signal: PropTypes.string.isRequired,
  redirect: PropTypes.bool
};
