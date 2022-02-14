import axios from 'axios';
import codeMessages from './codeMessages';

function axiosFunc(axiosConfig, customOptions) {

  const service = axios.create({
    baseURL: 'http://localhost:8888', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  // 自定义配置
  let custom_options = Object.assign({
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
  }, customOptions);

  service.interceptors.request.use(
    config => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例  
      if (custom_options.loading) {
        LoadingInstance._count++;
        if(LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service();
        }
      }
      return config;
    }, 
    error => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    response => {
      removePending(response.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      return response;
    },
    error => {
      error.config && removePending(error.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      return Promise.reject(error);
    }
  );

  return service(axiosConfig)
}

const pendingMap = new Map();

/**
 * 生成每个请求唯一的键
 * @param {*} config 
 * @returns string
 */
function getPendingKey(config) {
  let {url, method, params, data} = config;
  if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config 
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel);
    }
  });
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
 function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
       const cancelToken = pendingMap.get(pendingKey);
       cancelToken(pendingKey);
       pendingMap.delete(pendingKey);
    }
  }
  
  /**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options) {
    if(_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
    if(LoadingInstance._count === 0) {
      LoadingInstance._target.close();
      LoadingInstance._target = null;
    }
}

export default axiosFunc;