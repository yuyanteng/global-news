import axios from "../utils/axios";

export function fetchArticleList(params) {
  return axios({url: '/api/v1/topics', method: 'GET', params})
}