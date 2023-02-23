// 将图片获取到转化成base64下载
export function downLoadImg(downloadName, url, callback) {
  const tag = document.createElement("a");
  // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
  tag.setAttribute("download", downloadName);
  if (url.indexOf('data:image') !== -1) {
    tag.href = url
    tag.click();
    if (callback) {
      callback()
    }
  } else {
    const image = new Image();
    // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
    image.src = url + "?time=" + new Date().getTime();
    //重要，设置 crossOrigin 属性，否则图片跨域会报错
    image.setAttribute("crossOrigin", "Anonymous");
    // 图片未加载完成时操作会报错
    image.onload = () => {
      tag.href = getImageDataURL(image);
      tag.click();
      if (callback) {
        callback()
      }
    };
  }
}
export function downLoadFile(downloadName, url) {
  const tag = document.createElement("a");
  // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
  tag.setAttribute("download", downloadName);
  tag.href = url
  tag.click();
}
export function htmltoVideo(elementToCustom, time, callback) {
  if (elementToCustom?.captureStream) {
    let stream = elementToCustom.captureStream()
    let recorder = new MediaRecorder(stream, { mimeType: 'video/webm'});
    const data = []
    recorder.ondataavailable = function(event) {
        if (event.data && event.data.size) {
            data.push(event.data);
        }
    }
    recorder.onstop = function() {
        var blob = new Blob(data, {
            type: "video/webm"
        });
        downLoadFile(generateUUID(), URL.createObjectURL(blob))
    }
    recorder.start()
    setTimeout(() => {
        recorder.stop();
        if (callback) {
          callback()
        }
    }, 5000);
  } else {
    let canvas2d = document.createElement('canvas')
    let context = canvas2d.getContext('2d');
    canvas2d.width = elementToCustom.clientWidth;
    canvas2d.height = elementToCustom.clientHeight;
    let isStoppedRecording = false;
    (function looper() {
        html2canvas(elementToCustom).then(function(canvas) {
            context.clearRect(0, 0, canvas2d.width, canvas2d.height);
            context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);
            if(isStoppedRecording) {
                return;
            }
            requestAnimationFrame(looper);
        });
    })();

    let recorder = new RecordRTC(canvas2d, {
        type: 'canvas'
    });
    recorder.startRecording();
    // 录制时间
    setTimeout(() => {
        recorder.stopRecording(function() {
            isStoppedRecording = true;
            let blob = recorder.getBlob();
            downLoadFile(generateUUID(), URL.createObjectURL(blob))
        });
        if (callback) {
          callback()
        }
    }, time);
  }
}
export async function htmltoGif(elementToCustom, time, callback) {
  let canvas2d = document.createElement('canvas')
    let context = canvas2d.getContext('2d');
    canvas2d.width = elementToCustom.clientWidth;
    canvas2d.height = elementToCustom.clientHeight;
    let isStoppedRecording = false;
    let gif = new GIF({
      quality: 10, // gif 清晰度，越低越清晰
      workerScript: '/gif.worker.js',
      debug: true, // 开启调试模式
    });
    (function looper() {
        html2canvas(elementToCustom).then(function(canvas) {
            context.clearRect(0, 0, canvas2d.width, canvas2d.height);
            context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);
            if(isStoppedRecording) {
                return;
            }
            // 将canvas节点追加到gif帧中，delay 是每一帧的时间间隔
            let image = new Image();
            image.src = canvas2d.toDataURL("image/png");
            image.onload = () => {
              gif.addFrame(image, {delay: 100});
            }
            requestAnimationFrame(looper);
        });
    })();
    // 监听渲染完毕，并输出 gif 地址
    gif.on('finished', function(blob) {
      const url = URL.createObjectURL(blob);
      downLoadFile(generateUUID(), url)
      if (callback) {
        callback()
      }
    });
    setTimeout(() => {
      isStoppedRecording = true;
      // 将每一帧渲染成一张完成的gif
      gif.render();
    }, time);
}
// 裁剪image
export function clipImage(url) {
  let image = new Image();
  image.src = url;
  image.onload = () => {
      const width = 750
      const height = 500
      const new_canvas = document.createElement("canvas");
      new_canvas.width = width;
      new_canvas.height = height;
      const ctx = new_canvas.getContext("2d");
      // 裁剪
      ctx.drawImage(image, 56, 40, width, height, 0, 0, width, height);
      // 获取base64
      return new_canvas.toDataURL('images/png')
      // 获取blob
      // new_canvas.toBlob((blob) => {
      //     let file = new File([blob], `测试.png`)
      //     return file
      //     let formData = new FormData()
      //     formData.append('file', file)
      // })
  };
  image.onerror = () => {
      reject('图片加载失败')
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
