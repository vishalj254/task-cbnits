import axios from 'axios';
const BaseURL = 'https://tiny-list.herokuapp.com/api/v1';

const postDataAxios = async (
  url,
  body,
  config = {'content-type': 'application/json;charset=utf-8'},
) => {
  try {
    var response = await axios.post(`${BaseURL}/${url}`, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getDataAxios = async (
  url,
  config = {'content-type': 'application/json;charset:utf-8'},
) => {
  try {
    var response = await axios.get(`${BaseURL}/${url}`, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const putDataAxios = async (
  url,
  body,
  config = {'content-type': 'application/json;charset=utf-8'},
) => {
  try {
    var response = await axios.put(`${BaseURL}/${url}`, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteDataAxios = async (
  url,
  body,
  config = {'content-type': 'application/json;charset=utf-8'},
) => {
  try {
    var response = await axios.delete(`${BaseURL}/${url}`, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export {BaseURL, postDataAxios, getDataAxios, putDataAxios, deleteDataAxios};
