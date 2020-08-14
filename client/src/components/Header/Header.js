import React from 'react';
import css from 'css-template';
import { Link } from 'react-router-dom';
import { DevLinks } from '../DevLinks/DevLinks';
import logo from '../../img/foodeeLogo.png';
// Open - http://localhost:1234/components/header
// Open - http://localhost:6006/?path=/story/components-header--normal

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
    }
  `,
  logo: css`
     {
      width: 138px;
    }
  `,
  nav: css`
     {
      background: yellow;
    }
  `,
  links: css`
     {
      margin-right: 10px;
    }
  `
};

export const Header = function () {
  return (
    <div style={styles.container} data-file={filePath}>
      <span>
        <img style={styles.logo} src={logo} />
      </span>
      <nav style={styles.nav}>
        <Link style={styles.links} to='/login'>
          Login
        </Link>
        <Link style={styles.links} to='/register'>
          Register
        </Link>
      </nav>
      <DevLinks displayName={Header.displayName} filePath={filePath} />
    </div>
  );
};

Header.displayName = 'Header';
Header.testProps = [];
Header.propTypes = {};
