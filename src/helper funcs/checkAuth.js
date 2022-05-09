import Cookies from 'js-cookie';

const checkAuth = () => {
  if (Cookies.get('token')) { return true; }
  return false;
};

export default checkAuth;
