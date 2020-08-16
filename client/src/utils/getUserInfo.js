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

export const getUserInfo = () => {
  var userinfo = {
    loggedIn: false
  };
  try {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const tokendata = parseJwt(token);
      userinfo.role = tokendata.role;
      userinfo.name = tokendata.name;
      userinfo.loggedIn = true;
    }
  } catch (error) {
    console.error(error);
  }
  return userinfo;
};
