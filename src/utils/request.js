import axios from "axios";
import { Message } from "element-ui";
const request = axios.create({
  baseURL: "https://dtdataapi.wedengta.com",
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10 * 1000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: false,
  transformRequest: [
    (data, headers) => {
      // const token = localStorage.getItem("Authorization");
      // if (token) {
      //   headers["Authorization"] = token;
      // }
      if (headers["Content-Type"] === "multipart/form-data") {
        return data;
      } else {
        return JSON.stringify(data);
      }
    }
  ]
});

// 响应拦截器
request.interceptors.response.use(response => {
  const status = response.status;
  if (status != 200) {
    return Promise.reject(response);
  }
  if (response.data?.msg === 'success' || response.data?.code === 200) {
    return response.data.data
  } else {
    Message.error(response.data?.message || '服务器错误提示')
    // setTimeout(() => {
    //   window.location.href = '/login';
    //   localStorage.clear()
    // }, 800)
    return Promise.reject(response);
  }
});

export default request;
