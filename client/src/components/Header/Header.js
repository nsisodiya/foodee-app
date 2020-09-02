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
import { iff } from '../../utils/iff';
import { getUserInfo } from '../../utils/getUserInfo';

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

export const Header = function () {
  var userinfo = getUserInfo();
  return (
    <div style={styles.container} data-file={filePath}>
      <Link to='/'>
        <span>
          <img style={styles.logo} src={logo} />
        </span>
      </Link>
      <Columns centered>
        <nav style={styles.nav}>
          <If check={userinfo.loggedIn}>
            <>
              <If check={userinfo.role === 'ADMIN'}>
                <Link style={styles.links} to='/add-restaurant'>
                  Add Restaurant
                </Link>
              </If>

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

        <If check={userinfo.loggedIn}>
          <>
            <UserName>
              {iff(
                userinfo.role === 'ADMIN',
                `${userinfo.name} (${userinfo.role})`,
                `${userinfo.name}`
              )}
            </UserName>
            <ColSpacer>15</ColSpacer>
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
