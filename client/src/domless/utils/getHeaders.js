export const getHeaders = function () {
  return {
    'Content-Type': 'application/json',
    authorization: `Bearer ${window.localStorage.getItem('token')}`
  };
};
