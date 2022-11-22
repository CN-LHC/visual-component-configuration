export function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
/*异步等待一段时间*/
export function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds);
  });
}
/**
 * 生成随机len位数字
 */
 export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
//防抖
export function debounce(fn, delay = 500) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
export function requestHttp (apiConfig) {
  let options = {}
  options.method = apiConfig.method || 'POST'
  if (apiConfig.method && apiConfig.method.toUpperCase() === 'POST' || !apiConfig.method) {
      options.headers = {
          'content-type': apiConfig.contentType || 'application/json'
      }
      if (!apiConfig.contentType || apiConfig.contentType === 'application/json') {
          options.body = JSON.stringify(apiConfig.body)
      } else if (apiConfig.contentType === 'application/x-www-form-urlencoded'){
          let formData = new FormData();
          Object.keys(apiConfig.body).forEach((key) => {
              formData.append(key, apiConfig.body[key])
          })
          options.body = formData
      }
  }
  return fetch(apiConfig.url, options).then(response => response.json()).then((data) => {
      return data.data
  })
}
