import axios from 'axios';
import Cookies from 'js-cookie';

export default axios.create({
  baseURL: 'https://bootcamp.akbolat.net',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${Cookies?.get('token')}`,
  },
});
