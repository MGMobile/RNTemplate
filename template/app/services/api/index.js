import {API_ROUTES} from '@app/services/api/routes';
import axios from 'axios';
import apisauce from 'apisauce';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const create = (baseURL = Config.API_URL, headers = {}, timeout = 30000) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      ...headers,
    },
    timeout,
  });

  const setTokenHeader = token => {
    api.setHeaders({
      Authorization: 'Bearer ' + token,
    });
  };

  const resetToken = () => {
    api.deleteHeader('token');
  };

  return {
    setTokenHeader,
    resetToken,
  };
};

export default {
  create,
};
