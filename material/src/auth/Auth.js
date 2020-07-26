
let _auth = {
  token: null,
  userId: null
}

const AUTH = (auth) => {
  if (auth != null && auth != undefined) {
    // one layer deep copy
    _auth = {...auth};
  }
  return _auth;
}

export default AUTH;
