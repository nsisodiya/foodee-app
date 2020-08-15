import styled, { css as tx } from 'styled-components';
import React from 'react';

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) =>
    props.centered &&
    tx`
      align-items: center;
    `}
`;
export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Hr = styled.hr`
  border-top: 1px solid lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ColSpacer = ({ children }) => {
  return <div style={{ width: `${children}px` }} />;
};
export const RowSpacer = ({ children }) => {
  return <div style={{ height: `${children}px` }} />;
};

export const If = ({ check, children }) => {
  if (children.length === undefined) {
    if (check) {
      return children;
    }
    return null;
  }
  if (check) {
    return children[0];
  }
  return children[1];
};
