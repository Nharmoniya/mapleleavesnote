import request from '@/helpers/requests';

const URL = {
  REGISTER: '/auth/register',
  AUTH: '/auth',
  LOGOUT: '/auth/logout',
  LOGIN: '/auth/login',
};

export default {
  //注册接口
  register({username, password}) {
    return request(URL.REGISTER, 'POST', {username, password});
  },
  auth() {
    //检查登录接口
    return request(URL.AUTH);
  },
  logout(){
    //退出登录接口
    return request(URL.LOGOUT);
  },
  login({username,password}){
    //登录接口
    return request(URL.LOGIN,'POST',{username,password})
  },
};