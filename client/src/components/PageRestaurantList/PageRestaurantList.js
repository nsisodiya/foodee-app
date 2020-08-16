import React from 'react';
//import css from 'css-template';
import PropTypes from 'prop-types';
//import css from 'css-template';
//import styled from 'styled-components';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { DevLinks } from '../DevLinks/DevLinks';
import { H1 } from '../../css/common.styled';
//import { iff } from '../../utils/iff';
import { RowSpacer, Rows, If } from '../../css/Layout';
import { RestaurantWidget } from '..';
import { getRestaurantData } from '../../domless/xhr/getRestaurantData';
import { getUserInfo } from '../../utils/getUserInfo';
import { history } from '../../domless/utils/history';
import { Container } from './PageRestaurantList.styled';

// Open - http://localhost:1234/components/page-restaurant-list
// Open - http://localhost:6006/?path=/story/components-pagerestaurantlist--normal

const filePath = `/src/components/PageRestaurantList/PageRestaurantList.js`;
export class PageRestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null };
  }
  componentDidMount() {
    const userinfo = getUserInfo();
    if (userinfo.loggedIn) {
      try {
        (async () => {
          const res = await getRestaurantData();
          console.error('res', res);
          this.setState({
            data: res,
            loading: false
          });
        })();
      } catch (error) {
        console.error(error);
      }
    } else {
      //Redirect to /login
      history.push('/login');
      // setTimeout(() => {
      //   history.push('/login');
      // }, 0);
    }
  }

  //componentWillUnmount() {}
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
          <If check={this.state.data.length > 0}>
            <H1>We found few restaurants around your place</H1>
          </If>
          {this.state.data.map((v) => {
            return (
              <div key={v.id}>
                <Link to={`/restaurant/${v.id}`}>
                  <RestaurantWidget
                    {...{
                      name: v.name,
                      avgRating: v.avgRating,
                      totalReviews: v.reviews.length,
                      address: v.address,
                      cuisines: v.cuisines,
                      imageurl: v.imageurl,
                      hours: v.hours,
                      website: v.website,
                      phone: v.phone
                    }}
                  />
                </Link>

                <RowSpacer>20</RowSpacer>
              </div>
            );
          })}
        </Rows>
        <DevLinks displayName={PageRestaurantList.displayName} filePath={filePath} />
      </Container>
    );
  }
}

PageRestaurantList.displayName = 'PageRestaurantList';
PageRestaurantList.testProps = [
  {
    id: 'xyz'
  }
];
PageRestaurantList.propTypes = {
  id: PropTypes.string
};
