import { Route, Router, Switch } from 'react-router-dom';
import React from 'react';
import { paramCase } from 'change-case';
import {
  AllStores,
  Header,
  PageRegister,
  ReviewBox,
  AddReviewBox,
  Rating,
  SimpleComponentViewer,
  PageLogin,
  RestaurantFullWidget,
  RestaurantWidget,
  PageRestaurantList,
  PageAddRestaurant,
  PageRestaurantDetails
} from '../components';
import { history } from '../domless/utils/history';

import { ConstantsViewer } from '../devtools/ConstantsViewer';
import { UserRoleType } from '../constants/UserRoleType';

function NoMatch() {
  return (
    <div>
      <h3 className='m-10 p-10 text-center text-6xl'>404 - Page not found</h3>
    </div>
  );
}
const allComponents = [
  AllStores,
  ReviewBox,
  AddReviewBox,
  RestaurantWidget,
  RestaurantFullWidget,
  Header,
  PageRegister,
  PageLogin,
  Rating,
  PageRestaurantList,
  PageAddRestaurant,
  PageRestaurantDetails
];

function generateRoutes(compArray) {
  return compArray.map((v) => {
    const name = v.displayName;
    const slug = `/components/${paramCase(name)}`;
    console.warn('Added Route ->', slug);
    return (
      <Route key={slug} path={slug}>
        <SimpleComponentViewer comp={v} />
      </Route>
    );
  });
}
function loadAllComponents(compArray) {
  return compArray.map((v) => {
    const name = v.displayName;
    const slug = `/components/${paramCase(name)}`;
    return <SimpleComponentViewer key={slug} comp={v} />;
  });
}
export const AppRouter = function () {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path='/'>
            <PageRestaurantList />
          </Route>
          <Route path='/all'>{loadAllComponents(allComponents)}</Route>
          <Route path='/register/'>
            <PageRegister />
          </Route>
          <Route path='/login/'>
            <PageLogin />
          </Route>
          <Route path='/add-restaurant/'>
            <PageAddRestaurant />
          </Route>
          <Route path='/restaurants/'>
            <PageRestaurantList />
          </Route>
          <Route path='/restaurant/:id'>
            <PageRestaurantDetails />
          </Route>
          <Route path='/constants/userroletype'>
            <ConstantsViewer data={UserRoleType} name='UserRoleType' />
          </Route>
          {generateRoutes(allComponents)}
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
