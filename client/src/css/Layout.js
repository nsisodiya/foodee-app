import styled, { css as tx } from 'styled-components';

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
