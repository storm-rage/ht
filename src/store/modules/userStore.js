// 用户store
import windowCookie from "@utils/cookie";
import {windowLsStorege,windowSSStorage} from '@utils/storageUtils';
import {getMenuPower} from '@utils/menuTree';
import loginApi from '@modules/base/api/loginApi';
import homeApi from '@modules/base/api/homeApi';

const state = {
  // 用户信息
  userInfo: {},
  messageTipNum: ''
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    const token = windowCookie.get('XSRF-TOKEN');
    if (userInfo && token) {
      userInfo.token = token;
    }
    state.userInfo = userInfo;
  },
  CLOSE_USER_SIGNZJDJBFLAG: (state) => {
    state.userInfo.signZJDJBFlag = false
  },
  SET_USER_POWER:(state, power) => {
    state.userInfo.power = power
  },
  SET_MESSAGE_TIP_NUM: (state,num) =>{
    state.messageTipNum = num
  }
}

const actions = {
  // 设置用户信息
  setUserInfo ({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },
  // 保存用户信息
  saveUserInfo({commit, state, dispatch}, userInfo) {
    // 设置项目,项目列表
    dispatch('enterprise/saveEntInfo', userInfo.entInfoList,{ root: true });
    if (userInfo.currentEnt) {
      dispatch('enterprise/setEntInfo', userInfo.currentEnt,{ root: true });
    }
    // 保存菜单树,保存菜单列表
    dispatch('menu/saveMenuTreeList',userInfo.resList,{root: true})
    //设置用户信息
    const user = {
      userName: userInfo.userName,
      loginName: userInfo.loginName,
      entName: userInfo.entName,
      entType:userInfo.entType,
      entId:userInfo.entId,
      mobileNo:userInfo.mobileNo,
      power:getMenuPower(userInfo.resList),
      signZJDJBFlag:userInfo.signZJDJBFlag
    }
    commit('SET_USER_INFO', user)
  },
  // 修改登录时弹出的资金登记簿
  closeUserSignZJDJBFlag({commit}){
    commit('CLOSE_USER_SIGNZJDJBFLAG')
  },
  //设置权限url
  setUserPower({ commit },power) {
    commit('SET_USER_POWER', power)
  },
  // 单点登录
  ssoTokenLogin({commit, state, dispatch}, ssoToken) {
    return new Promise((resolve,reject) => {
      loginApi.ssoLogin({token: ssoToken}).then((res) => {
        const result = {isSuccess: true,model: null}
        if (res.data) {
          const loginRes = res.data;
          if (loginRes.faceCheck || loginRes.userServiceAgreementFlag === '1') {
            result.model = result;
            result.needSignAgreement = true
          }else {
            dispatch('user/saveUserInfo', loginRes,{root: true});
          }
        }else {
          result.isSuccess = false;
        }
        resolve(result);
      }).catch(() => {
        reject(false)
      })

    })
  },
  // 退出登录清除相关信息
  logoutToClearUserInfo() {
    //清除local存储的信息
    windowSSStorage.clear()
    let localArr = ['regType','vuexAlong']
    localArr.forEach(item => {
      windowLsStorege.removeItem(item)
    })
    window.clearVuexAlong()
    //清除cookie
    let cookieArr = ['userName','powerArr','XSRF-TOKEN','SESSION']
    cookieArr.forEach(item =>{
      windowCookie.remove(item)
    })
  },
  // 消息未读数量更新
  setMessageTipNum({state, commit}) {
    return new Promise((resove,reject)=>{
      homeApi.getMessageReadCount()
        .then(res=>{
          commit('SET_MESSAGE_TIP_NUM', res.data.count)
          resove()
        })
        .catch(()=>{
          reject()
        })
    })
  }
}

const getters = {
  // 校验cookie里面的token和store里面的token是否相同
  isCurrentToken: (state) => () => {
    if (state.userInfo && state.userInfo.userName) {
      return state.userInfo&&state.userInfo.userName&&state.userInfo.token === windowCookie.get('XSRF-TOKEN')
    }
    return true;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
