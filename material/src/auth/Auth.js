import Cookies from 'js-cookie';



let _auth = {
  token: null,
  userId: null,
}

export const requestHeaders = () => {
  return {
    'Content-Type': 'application/json',
    "Authorization": "BEARER " + _auth.token
  }
}

export const clearAuth = () => {
  Cookies.remove('userId');
  Cookies.remove('token');
  _auth = {
    token: null,
    userId: null,
  };
}

export const getAuthfromCookie = () => {
  if (Cookies.get('userId') && Cookies.get('token')) {
    _auth.userId = Cookies.get('userId');
    _auth.token = Cookies.get('token');
    return true;
  } else {
    return false;
  }
}


const AUTH = (auth) => {
  if (auth !== null && auth !== undefined) {
    // one layer deep copy
    _auth = {...auth};
    Cookies.set('userId', auth.userId);
    Cookies.set('token', auth.token);
  }
  return _auth;
}

export default AUTH;
