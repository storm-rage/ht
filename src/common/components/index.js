import ZjLog from './log/ZjLog.js'
import { message } from '../utils/whl_resetMessage'
import zjConfirm from "./confirm/ZjConfirm";
import { messageBox } from "./messageBox"

const components = [
  //收缩
  // {
  //     name:'ZjFold',
  //     component: () => import('./fold/ZjFold.vue')
  // },
  //按钮
  {
    name: 'ZjButton',
    component: () => import('./button/ZjButton.vue')
  },
  //上传组件
  {
    name: 'ZjUpload',
    component: () => import('./button/ZjUpload.vue')
  },
  //复选框
  {
    name: 'ZjCheckbox',
    component: () => import('./checkbox/ZjCheckbox.vue')
  },
  //日期组件
  {
    name: 'ZjDatePicker',
    component: () => import('./datePicker/ZjDatePicker.vue')
  },
  //日期组件
  {
    name: 'ZjDateRangePicker',
    component: () => import('./datePicker/ZjDateRangePicker.vue')
  },
  //金额范围组件
  {
    name: 'ZjAmountRange',
    component: () => import('./amountRange')
  },
  //正整数范围组件
  {
    name: 'ZjNumRange',
    component: () => import('./numRange')
  },
  //表格
  {
    name: 'ZjTable',
    component: () => import('./table/ZjTable.vue')
  },
  //表格
  {
    name: 'ZjTableColumn',
    component: () => import('./table/ZjTableColumn.vue')
  },
  {
    name: 'ZjView',
    component: () => import('./view/ZjView.vue')
  },
  {
    name: 'ZjViewInline',
    component: () => import('./view/ZjViewInline.vue')
  },
  //快捷查询
  {
    name: 'ZjQuickQuery',
    component: () => import('./quickQuery/ZjQuickQuery.vue')
  },
  //天眼查
  {
    name: 'ZjEyeSky',
    component: () => import('./eyeSky/ZjEyeSky.vue')
  },
  //ukey签章
  {
    name: 'ZjSignature',
    component: () => import('./signature/ZjSignature.vue')
  },
  //查看器
  {
    name: 'ZjPreview',
    component: () => import('./preview/index.vue')
  },
  //年份
  {
    name: 'ZjYear',
    component: () => import('./year/ZjYear.vue')
  },
  //驳回dialog
  {
    name: 'ZjRejectDialog',
    component: () => import('./rejectDialog/ZjRejectDialog.vue')
  },
  //数字输入框
  {
    name: 'ZjNumberInput',
    component: () => import('./input/ZjNumberInput.vue')
  },
  //锚点
  {
    name: 'ZjAnchor',
    component: () => import('./anchor/ZjAnchor.vue')
  },
  //多协议查看
  {
    name: 'ZjMultiAgree',
    component: () => import('@/common/components/multiAgree/ZjMultiAgree.vue')
    // component:(resolve) => require(['./multiAgree/ZjMultiAgree.vue'],resolve)
  },
  //云服务签章
  {
    name: 'ZjCertuficate',
    component: () => import('./certuficate/ZjCertuficate.vue')
  },
  //tabs
  {
    name: 'ZjTabs',
    component: () => import('./tabs/ZjTabs.vue')
  },
  //单张发票
  {
    name: 'ZjOneInvoice',
    component: () => import('./oneInvoice/ZjOneInvoice.vue')
  },
  { // 弹框提示
    name: 'ZjMessageBox',
    component: () => import('./messageBox/ZjMessageBox')
  },
  { // 金额统计
    name: 'ZjMoneyBlock',
    component: () => import('./moneyBlock/ZjMoneyBlock')
  },
  //工作流
  {
    name: 'ZjWorkflow',
    component: () => import('./workflow/ZjWorkflow.vue')
  },
  {
    name: 'ZjHeader',
    component:() => import('./content/ZjHeader.vue')
  },
  {
    name: 'ZjContentBlock',
    component:() => import('./content/ZjContentBlock.vue')
  },
  {
    name: 'ZjContentFooter',
    component:() => import('./content/ZjContentFooter.vue')
  },
  {
    name: 'ZjCollapse',
    component:() => import('./collapse/ZjCollapse.vue')
  },
  {
    name: 'ZjContentContainer',
    component:() => import('./content/ZjContentContainer.vue')
  }
]

const install = function (Vue) {
  components.forEach(item => {
    Vue.component(item.name, item.component)
  })
  Vue.prototype.$log = ZjLog;
  Vue.prototype.$Message = message;
  Vue.prototype.$Confirm = zjConfirm;
  Vue.use(messageBox);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
