import { getHeaders } from '../utils/getHeaders';

export const getRestaurantData = async () => {
  //
  //let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()]);
  const r1 = fetch(`${process.env.API_URL}/restaurants`, {
    method: 'GET',
    headers: getHeaders()
  });
  const r2 = fetch(`${process.env.API_URL}/reviews`, {
    method: 'GET',
    headers: getHeaders()
  });
  const r3 = fetch(`${process.env.API_URL}/api/getReviewsAllRestaurant`, {
    method: 'GET',
    headers: getHeaders()
  });
  let [restaurants, reviews, ratingData] = await Promise.all([r1, r2, r3])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .catch(function (error) {
      // if there's an error, log it
      console.error(error);
    });

  var restaurantData = {};
  restaurants.forEach((v) => {
    restaurantData[v.id] = v;
    restaurantData[v.id].totalReviews = 0;
    restaurantData[v.id].avgRating = null;
  });
  reviews.forEach((r) => {
    if (restaurantData[r.restaurant] !== undefined) {
      restaurantData[r.restaurant].reviews.push(r);
    }
  });
  ratingData.forEach((r) => {
    if (restaurantData[r.restaurant] !== undefined) {
      restaurantData[r.restaurant].totalReviews = r.totalReviews;
      //! TODO - remove this hardcoding. move to server
      restaurantData[r.restaurant].avgRating = parseFloat(r.avgRating.toFixed(1));
    }
  });
  ///  -=================  Now sorting by rating.
  var finalData = Object.keys(restaurantData)
    .map((restId) => {
      return restaurantData[restId];
    })
    .sort((b, a) => {
      return a.avgRating - b.avgRating;
    });
  return finalData;
};
window.getRestaurantData = getRestaurantData;
