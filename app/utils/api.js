import axios from 'axios';
import qs from 'qs';

const apikey = 'IzDE1kPXtVmBvVwRiJAqGuXJGWDI1fE6Nl9jM8uU';

export default {
  fetchFoodsFromName: function (foodname, max = 25, offset = 0) {
    var encodedURI = window.encodeURI('https://api.nal.usda.gov/ndb/search/');
    return axios.get(encodedURI, {
      params:{
        q:foodname,
        format:'json',
        sort:'n',
        max:max,
        offset:offset,
        ds:'Standard Reference',
        api_key: apikey
      }
    })
    .then(function (response) {
      if(!response.data.errors){
        return response.data.list;
      }
        return {errorMessage: response.data.errors.error[0].message}
    })
    .catch(() => ({errorMessage: 'Could not fetch foods for such name'}));
  },
  fetchFoodsInfo: function (foodcodes) {
    // var codelist = Object.keys(foodcodes).reduce((acc, cur) => {
    //   acc.push('ndbno=' + cur);
    //   return acc
    // }, []).join('&');
    var encodedURI = window.encodeURI('https://api.nal.usda.gov/ndb/V2/reports?');
    return axios.get(encodedURI, {
      paramsSerializer: function(params){
        return qs.stringify(params, {arrayFormat: 'repeat'});
      },
      params:{
        ndbno:foodcodes,
        format:'json',
        api_key: apikey,
        type:'b'
      }
    })
    .then(function (response) {
      if(!response.data.errors){
        return response.data.foods;
      }
        return {errorMessage: response.data.errors.error[0].message}
    })
    .catch(() => ({errorMessage: 'Could not fetch data for these foods'}));
  }
};
