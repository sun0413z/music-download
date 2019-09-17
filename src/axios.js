import axios from 'axios'
// 创建axios实例
export const service = axios.create({
  baseURL: 'http://47.101.196.51:8080', // node环境的不同，对应不同的baseURL
  withCredentials: true // 允许携带cookie
})
// export const search = axios.create({
//   baseURL: 'https://v1.itooi.cn', // node环境的不同，对应不同的baseURL
//   withCredentials: true // 允许携带cookie
// })