/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:06:35 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-23 15:07:02
 * API管理
 */

import request from "@/utils/request";

//接口管理
export default {
  // 登陆相关接口

  login: (params) => {
    return request({
      url: 'https://gildata.wedengta.com/account_centert/user/login',
      method: 'post',
      data: params
    })
  },
  token: (params) => {
    return request({
      url: 'https://gildata.wedengta.com/account_centert/user/tokenVerify',
      method: 'get',
      params,
    })
  },
  pic: (params = {}) => {
    return request({
      url: 'https://gildata.wedengta.com/account_centert/verify/pic/captcha',
      method: 'get',
      params,
    })
  },
  verify: (params) => {
    return request({
      url: 'https://gildata.wedengta.com/account_centert/verify/pic/verify',
      method: 'post',
      data: params
    })
  },
  // ------------数据管理相关接口-----------------

  // 新增接口配置
  apiAdd: (params) => {
    return request({
      url: '/config/apiAdd',
      method: 'post',
      data: params
    })
  },
  // 删除接口配置
  apiDelete: (params) => {
    return request({
      url: '/config/apiDelete',
      method: 'post',
      data: params
    })
  },
  // 修改接口配置
  apiUpdate: (params) => {
    return request({
      url: '/config/apiUpdate',
      method: 'post',
      data: params
    })
  },
  // 获取接口详情
  getApi: (params) => {
    return request({
      url: '/config/getApi',
      method: 'get',
      params,
    })
  },
  // 查询接口配置列表
  getApiList: (params) => {
    return request({
      url: '/config/getApiList',
      method: 'get',
      params,
    })
  },
  
  // ------------组件管理相关接口-----------------

  // 新增图表配置
  chartAdd: (params) => {
    return request({
      url: '/config/chartAdd',
      method: 'post',
      data: params
    })
  },
  // 删除图表配置
  chartDelete: (params) => {
    return request({
      url: '/config/chartDelete',
      method: 'post',
      data: params
    })
  },
  // 修改图表配置
  chartUpdate: (params) => {
    return request({
      url: '/config/chartUpdate',
      method: 'post',
      data: params
    })
  },
  // 获取图表配置详情
  getChart: (params) => {
    return request({
      url: '/config/getChart',
      method: 'get',
      params,
    })
  },
  // 查询图表配置列表
  getChartList: (params) => {
    return request({
      url: '/config/getChartList',
      method: 'get',
      params,
    })
  },
};
