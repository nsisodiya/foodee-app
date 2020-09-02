import React from 'react';
//import css from 'css-template';
import PropTypes from 'prop-types';
//import styled from 'styled-components';
import { Skeleton } from 'antd';
import { H1 } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';
//import { iff } from '../../utils/iff';
import { getHeaders } from '../../domless/utils/getHeaders';
import { RowSpacer, Rows, Columns, If, ColSpacer } from '../../css/Layout';
import { AddReviewBox, RestaurantFullWidget, ReviewBox } from '..';
import { evtbus } from '../../utils/evtbus';
import { Container } from './PageRestaurantDetails.styled';
// Open - http://localhost:1234/components/page-restaurant-details
// Open - http://localhost:6006/?path=/story/components-pagerestaurantdetails--normal

const getReviewBoxAttrs = (v) => {
  return {
    avatarurl: `https://robohash.org/${v.user.name}.png?size=50x50&set=set1`,
    author: v.user.name,
    visitDate: v.visitDate,
    comment: v.comment,
    rating: v.rating,
    id: v.id
  };
};
const filePath = `/src/components/PageRestaurantDetails/PageRestaurantDetails.js`;
export class PageRestaurantDetails extends React.Component {
  constructor(props) {
    super(props);
    const restaurantId = location.pathname.split('/')[2];
    this.state = { loading: true, data: null, restaurantId: restaurantId };
  }
  smartReload() {
    try {
      if (typeof this.state.restaurantId === 'string' && this.state.restaurantId !== '') {
        (async () => {
          const res = await (
            await fetch(
              `${process.env.API_URL}/api/getRestaurantWithReviews/${this.state.restaurantId}`,
              {
                method: 'GET',
                headers: getHeaders()
              }
            )
          ).json();
          console.error('res', res);
          res.avgRating = null;
          if (res.reviews.length !== 0) {
            var total = 0;
            res.reviews.forEach((v) => {
              total = total + v.rating;
            });
            res.avgRating = parseFloat((total / res.reviews.length).toFixed(1));
          }

          this.setState({
            data: res,
            loading: false
          });
        })();
      } else {
        console.error(
          'Something wrong, I wan looking for restaurantId but I got',
          this.state.restaurantId
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    this.unsub1 = evtbus.subscribe('NEW_COMMENT_ADDED', () => {
      this.smartReload();
    });
    this.smartReload();
  }

  componentWillUnmount() {
    this.unsub1();
  }
  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Skeleton active loading />
        </Container>
      );
    }
    return (
      <Container data-file={filePath}>
        <Rows centered>
          <RowSpacer>30</RowSpacer>
          <RestaurantFullWidget
            {...{
              name: this.state.data.name,
              id: this.state.data.id,
              avgRating: this.state.data.avgRating,
              totalReviews: this.state.data.reviews.length,
              address: this.state.data.address,
              cuisines: this.state.data.cuisines,
              imageurl: this.state.data.imageurl,
              hours: this.state.data.hours,
              website: this.state.data.website,
              phone: this.state.data.phone
            }}
          />
          <RowSpacer>40</RowSpacer>
          <Columns>
            <Rows centered>
              <H1>Highest Rated</H1>
              {(() => {
                const topComment = JSON.parse(JSON.stringify(this.state.data.reviews)).sort(
                  (b, a) => {
                    return a.rating - b.rating;
                  }
                )[0];
                if (topComment !== undefined) {
                  return <ReviewBox {...getReviewBoxAttrs(topComment)} />;
                }
                return <div>No reviews yet</div>;
              })()}
            </Rows>
            <ColSpacer>20</ColSpacer>
            <Rows centered>
              <H1>Low Rated</H1>
              {(() => {
                if (this.state.data.reviews.length === 1) {
                  return;
                }
                const topComment = JSON.parse(JSON.stringify(this.state.data.reviews)).sort(
                  (b, a) => {
                    return b.rating - a.rating;
                  }
                )[0];
                if (topComment !== undefined) {
                  return <ReviewBox {...getReviewBoxAttrs(topComment)} />;
                }
                return <div>No reviews yet</div>;
              })()}
            </Rows>
          </Columns>
          <RowSpacer>40</RowSpacer>
          <H1>Add your review</H1>
          <AddReviewBox restaurant={this.state.restaurantId} />
          <RowSpacer>10</RowSpacer>

          <If check={this.state.data.reviews.length > 0}>
            <H1>All Reviews</H1>
          </If>
          {this.state.data.reviews.map((v) => {
            return <ReviewBox key={v.id} {...getReviewBoxAttrs(v)} />;
          })}
        </Rows>
        <DevLinks displayName={PageRestaurantDetails.displayName} filePath={filePath} />
      </Container>
    );
  }
}

PageRestaurantDetails.displayName = 'PageRestaurantDetails';
PageRestaurantDetails.testProps = [
  {
    id: 'xyz'
  }
];
PageRestaurantDetails.propTypes = {
  id: PropTypes.string
};
