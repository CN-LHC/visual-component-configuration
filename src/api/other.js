import axios from "axios";

// 搜索股票
export function getStock(params) {
  return new Promise(async (resolve) => {
    let { data } = await axios({
      url: `https://sec.wedengta.com/search?action=search`,
      method: "get",
      params,
    });
    try {
      resolve(JSON.parse(data.content))
    } catch (error) {
      resolve({})
    }
  })
}
// 通用获取股票板块信息
export function getCommonStockPlate(payload) {
  return new Promise(async (resolve) => {
    let { data } = await axios({
      url: 'https://comm.wedengta.com/?s=base&f=getSecBaseInfo&req=SecBaseInfoReq&rsp=SecBaseInfoRsp',
      method: "post",
      data: payload,
    })
    try {
      resolve(JSON.parse(data.content))
    } catch (error) {
      resolve({})
    }
  })
}
