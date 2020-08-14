import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import styled, { css as tx } from 'styled-components';
import StarFilled from '@ant-design/icons/es/icons/StarFilled';
import { DevLinks } from '../DevLinks/DevLinks';
import { iff } from '../../utils/iff';

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) =>
    props.centered &&
    tx`
      align-items: center;
    `}
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  border-top: 1px solid lightgray;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const styles = {
  container: css`
    position: relative;
    width: 558px;
    background: white;
    padding: 14px;
    border-radius: 5px;
  `,
  title: css`
    font-weight: 700;
    margin-top: 10px;
    line-height: 22px;
    font-size: 24px;
    color: #cb202d;
  `,
  imagebox: css`
    width: 105px;
    height: 105px;
    border: 1px solid lightgray;
    border-radius: 14px;
    overflow: hidden;
  `,
  img: css`
    max-width: max-content;
    height: 100%;
  `,
  ratingvalue: css`
    font-size: 13px;
    font-weight: 500;
    color: #1c1c1c;
    margin-left: 2px;
  `,
  ratingcount: css`
    font-size: 13px;
    font-weight: 400;
    color: #696969;
    margin-left: 2px;
  `,
  address: css`
    max-width: 370px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #89959b;
  `,
  field: css`
    font-size: 12px;
    color: #89959b;
    width: 115px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.01em;
  `,
  fieldval: css`
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #33373d;
    max-width: 300px;
    display: inline-block;
  `
};

// Open - http://localhost:1234/components/restaurant-widget
// Open - http://localhost:6006/?path=/story/components-restaurantwidget--normal

const filePath = `/src/components/RestaurantWidget/RestaurantWidget.js`;

export const RestaurantWidget = function ({
  name,
  avgRating,
  reviews,
  address,
  cuisines,
  imageurl,
  hours,
  website,
  phone
}) {
  return (
    <div data-file={filePath} style={styles.container}>
      <Rows>
        <Columns>
          <div style={styles.imagebox}>
            <img style={styles.img} src={imageurl} />
          </div>
          <div
            style={css`
              margin-left: 10px;
            `}>
            <div style={styles.title}>{name}</div>
            <Columns centered>
              <StarFilled />
              {iff(
                typeof avgRating === 'number',
                <>
                  <span style={styles.ratingvalue}>{avgRating}</span>
                  <span style={styles.ratingcount}>({reviews})</span>
                </>,
                <span style={styles.ratingcount}>No rating</span>
              )}
            </Columns>
            <div style={styles.address}>{address}</div>
          </div>
        </Columns>
        <Hr />
        <Rows>
          <Columns centered>
            <span style={styles.field}>CUISINS</span>
            <span style={styles.fieldval}>{cuisines}</span>
          </Columns>
          <Columns centered>
            <span style={styles.field}>HOURS</span>
            <span style={styles.fieldval}>{hours}</span>
          </Columns>
          <Columns centered>
            <span style={styles.field}>Website</span>
            <span style={styles.fieldval}>{website}</span>
          </Columns>
          <Columns centered>
            <span style={styles.field}>CALL</span>
            <span style={styles.fieldval}>{phone}</span>
          </Columns>
        </Rows>
      </Rows>

      <DevLinks displayName={RestaurantWidget.displayName} filePath={filePath} />
    </div>
  );
};

RestaurantWidget.displayName = 'RestaurantWidget';
RestaurantWidget.testProps = [
  {
    id: '5f358588adc204837bf05f96',
    avgRating: 2.3,
    reviews: 345,
    name: 'Punjabi Angithi',
    address: '32-22, A 4, DDA Market, Paschim Vihar, New Delhi',
    cuisines: 'North Indian, Chinese, Kebab, Rolls, Fast Food',
    imageurl:
      'https://b.zmtcdn.com/data/pictures/chains/9/18198449/7516c3b9fbacd0e9402bc20ca0c6a920_featured_v2.jpg',
    hours: '10am – 11pm (Mon-Sun)',
    website: 'www.PunjabiAngithi.com',
    phone: '011 40191599'
  },
  {
    id: '5f35ae3fcc6fe94c50783090',
    avgRating: 4.2,
    reviews: 23453,
    name: 'New Rajdhani',
    address: 'Nanded City Pune',
    cuisines: 'North Indian, Rajdhani',
    imageurl:
      'https://b.zmtcdn.com/data/pictures/chains/7/311957/0658504b2288473d75c72c9dacedf268_featured_v2.jpg',
    hours: '9am – 11pm (Mon-Sun)',
    website: 'www.rajdhani.com',
    phone: '+91 98345 98762'
  },
  {
    id: '5f35ae3fcc6fe94c50783090',
    avgRating: null,
    reviews: null,
    name: 'Mohan Dhaba'
  }
];
RestaurantWidget.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  avgRating: PropTypes.number,
  reviews: PropTypes.number,
  address: PropTypes.string,
  cuisines: PropTypes.string,
  imageurl: PropTypes.string,
  hours: PropTypes.string,
  website: PropTypes.string,
  phone: PropTypes.string
};
