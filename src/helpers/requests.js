import axios from 'axios'
import {Message} from 'element-ui';

//axios响应头，直接copy官方文档
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//axios接口地址
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
// axios.defaults.baseURL = '//localhost:3006'

//
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status){
        return (status>=200 && status<300)||status===400
      }
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    if(sessionStorage.token) {
      axios.defaults.headers.common['Authorization']  = sessionStorage.token
    }

    axios(option).then(res => {
      if(res.data.status === 200) {
        if(res.data.token) {
          sessionStorage.token = res.data.token
        }
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
      // eslint-disable-next-line no-unused-vars
    } ).catch(err => {
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}
//使用方式👇
// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })