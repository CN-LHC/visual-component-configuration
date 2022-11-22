import axios from "axios";
const request = axios.create({
  baseURL: "",
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
      if (headers["Content-Type"] === "multipart/form-data") {
        let formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        return formData;
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
  if (response.data?.data) {
    return response.data.data
  } else {
    return Promise.reject(response);
  }
});

export default request;
