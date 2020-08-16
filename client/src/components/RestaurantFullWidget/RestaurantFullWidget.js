import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StarFilled from '@ant-design/icons/es/icons/StarFilled';
import { DevLinks } from '../DevLinks/DevLinks';
import { Rows, Columns, RowSpacer, Hr, If } from '../../css/Layout';

const { Container, Title, FieldVal, Field } = {
  Container: styled.div`
    position: relative;
    width: 558px;
    background: white;
    padding: 14px;
    border-radius: 5px;
    border: 1px solid gray;
  `,
  Title: styled.span`
    font-weight: 700;
    margin-top: 10px;
    line-height: 22px;
    font-size: 24px;
    color: #cb202d;
  `,
  FieldVal: styled.span`
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #33373d;
    max-width: 300px;
    display: inline-block;
  `,
  Field: styled.span`
    font-size: 12px;
    color: #89959b;
    width: 115px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.01em;
  `
};

const Address = styled.span`
  max-width: 370px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #89959b;
`;
const ReviewsCount = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #696969;
  margin-left: 2px;
`;
const AvgRating = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1c1c1c;
  margin-left: 2px;
`;
const styles = {
  imagebox: css`
    width: 100%;
    height: 200px;
    overflow: hidden;
  `,
  img: css`
    max-width: max-content;
  `
};
// Open - http://localhost:1234/components/restaurant-full-widget
// Open - http://localhost:6006/?path=/story/components-restaurantfullwidget--normal

const filePath = `/src/components/RestaurantFullWidget/RestaurantFullWidget.js`;
export const RatingCard = ({ avgRating, totalReviews }) => {
  return (
    <Columns centered>
      <StarFilled />
      <If check={typeof avgRating === 'number'}>
        <>
          <AvgRating>{avgRating}</AvgRating>
          <ReviewsCount>({totalReviews})</ReviewsCount>
        </>
        <>
          <ReviewsCount>No rating</ReviewsCount>
        </>
      </If>
    </Columns>
  );
};
RatingCard.propTypes = {
  avgRating: PropTypes.number,
  totalReviews: PropTypes.number
};

export const RestaurantFullWidget = function ({
  name,
  avgRating,
  totalReviews,
  address,
  cuisines,
  imageurl,
  hours,
  website,
  phone
}) {
  return (
    <Container data-file={filePath}>
      <Rows>
        <div style={styles.imagebox}>
          <img style={styles.img} src={imageurl} />
        </div>
        <RowSpacer>20</RowSpacer>
        <Columns>
          <div
            style={css`
              margin-left: 10px;
            `}>
            <Title>{name}</Title>
            <RatingCard {...{ avgRating, totalReviews }} />
            <Address>{address}</Address>
          </div>
        </Columns>
        <Hr />
        <Rows>
          <Columns centered>
            <Field>CUISINS</Field>
            <FieldVal>{cuisines}</FieldVal>
          </Columns>
          <Columns centered>
            <Field>HOURS</Field>
            <FieldVal>{hours}</FieldVal>
          </Columns>
          <Columns centered>
            <Field>Website</Field>
            <FieldVal>{website}</FieldVal>
          </Columns>
          <Columns centered>
            <Field>CALL</Field>
            <FieldVal>{phone}</FieldVal>
          </Columns>
        </Rows>
      </Rows>

      <DevLinks displayName={RestaurantFullWidget.displayName} filePath={filePath} />
    </Container>
  );
};

RestaurantFullWidget.displayName = 'RestaurantFullWidget';
RestaurantFullWidget.testProps = [
  {
    id: '5f358588adc204837bf05f96',
    avgRating: 2.3,
    totalReviews: 345,
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
    totalReviews: 23453,
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
    totalReviews: null,
    name: 'Mohan Dhaba'
  }
];
RestaurantFullWidget.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  avgRating: PropTypes.number,
  totalReviews: PropTypes.number,
  address: PropTypes.string,
  cuisines: PropTypes.string,
  imageurl: PropTypes.string,
  hours: PropTypes.string,
  website: PropTypes.string,
  phone: PropTypes.string
};
