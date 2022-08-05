const commonRouter = [
  //--------------------- 登录模块 -------------------------
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@baseModules/views/sysModules/login/index/Login.vue'),
    meta: {
      notRequireAuth: true,
      title:'登录'
    }
  },
  // 协议签署
  {
    path: '/signAgreement',
    name: 'signAgreement',
    component: () => import('@baseModules/views/sysModules/login/agreementSign/index.vue'),
    meta: {
      notRequireAuth: true,
      title:'账户激活',
      parent:'login'
    }
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('@baseModules/views/sysModules/register/register'),
    meta: {
      notRequireAuth: true,
      title:'企业注册'
    }
  },
  //忘记密码
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: () => import('@baseModules/views/sysModules/forgotPassword/index.vue'),
    meta: {
      notRequireAuth: true,
      title:'忘记密码'
    }
  },
  // 报错模块----------------
  {
    path: '/401',
    name: '401',
    component: () => import('@baseModules/views/sysModules/errorPage/401.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@baseModules/views/sysModules/errorPage/404.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@baseModules/views/sysModules/errorPage/500.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/*',
    redirect: '404'
  }
];
export default commonRouter;
