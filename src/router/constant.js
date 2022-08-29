/**
 * 路由常量
 */
/**
 * 路由白名单
 * @type {string[]}
 */
export const RouterWhiteList = ['login', 'forgetPass', 'userInfo', 'register', '401', '404', '500'];
/**
 * 亚米工作流引擎处理路由
 * 必须是/workflow开头的
 * @type {{}}
 */
export const YaMiWorkFlowRouter = {
  // 业务管理-产品开通申请
  CPSQ: '/workflow/businessApplyYamiAudit'
}
/**
 * 单点登录后端配置的路由
 * @type {{workflow: string, sso: string}}
 */
export const SSORouter = {
  sso: 'login',
  workflow: 'flowableApprove'
};
