import React from 'react';
import css from 'css-template';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoutOutlined from '@ant-design/icons/es/icons/LogoutOutlined';
import { DevLinks } from '../DevLinks/DevLinks';
import logo from '../../img/foodeeLogo.png';
import { Columns, If, ColSpacer } from '../../css/Layout';
// Open - http://localhost:1234/components/header
// Open - http://localhost:6006/?path=/story/components-header--normal

const UserName = styled.div``;

const filePath = `/src/components/Header/Header.js`;
const styles = {
  container: css`
     {
      position: relative;
      width: 100%;
      height: 80px;
      background: white;
      display: flex;
      flex-direction: row;
      padding-left: 100px;
      padding-right: 100px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid gray;
    }
  `,
  logo: css`
     {
      width: 138px;
    }
  `,
  nav: css`
     {
      background: white;
    }
  `,
  links: css`
     {
      margin-right: 10px;
      color: royalblue;
      font-weight: 600;
      text-decoration: underline;
      text-decoration-style: dashed;
      text-decoration-color: #71b6cc;
    }
  `
};
function parseJwt(token) {
  const a = 16;
  const b = -2;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(a)}`.slice(b)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const Header = function () {
  var userlabel;
  try {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const tokendata = parseJwt(token);
      if (tokendata.role === 'ADMIN') {
        userlabel = `${tokendata.name} (${tokendata.role})`;
      } else {
        userlabel = `${tokendata.name}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return (
    <div style={styles.container} data-file={filePath}>
      <Link to='/'>
        <span>
          <img style={styles.logo} src={logo} />
        </span>
      </Link>
      <Columns centered>
        <nav style={styles.nav}>
          <If check={userlabel !== undefined}>
            <>
              <Link style={styles.links} to='/add-restaurant'>
                Add Restaurant
              </Link>
              <Link style={styles.links} to='/restaurants'>
                Restaurants
              </Link>
            </>
            <>
              <Link style={styles.links} to='/login'>
                Login
              </Link>
              <Link style={styles.links} to='/register'>
                Register
              </Link>
            </>
          </If>
        </nav>

        <If check={userlabel !== undefined}>
          <>
            <UserName>{userlabel}</UserName>
            <ColSpacer>6</ColSpacer>
            <LogoutOutlined
              onClick={() => {
                localStorage.removeItem('token');
                window.location = '/login';
              }}
              style={{ color: 'red' }}
            />
          </>
        </If>
      </Columns>

      <DevLinks displayName={Header.displayName} filePath={filePath} />
    </div>
  );
};

Header.displayName = 'Header';
Header.testProps = [];
Header.propTypes = {};
