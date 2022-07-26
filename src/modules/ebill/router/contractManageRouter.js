/**
 * 保理合同（企业端）
 * @type {[{path: string, component: (function(): Promise<{readonly default?: {data(): {zjControl: {tableApi: *, queryMyEbContractDetail: *}, searchForm: {applyType: string, contractSignStatus: string, applyStartDate: string, contractNo: string, applyEndDate: string, applyStatus: string, serialNo: string}}, created(): void, methods: {toViewDetail(*): void}}}>), meta: {notRequireAuth: boolean, refreshIndex: number, isMock: boolean, keepAlive: boolean, root: string, title: string}, name: string},{path: string, component: (function(): Promise<{readonly default?: {components: {DetailPage: {data(): {zjControl: {downApi: *}, quotaList: [{field1: string, field3: string, field2: string, field4: string}], fileList: [{field1: string, field3: string, field2: string, field5: string, field4: string}]}, methods: {toDownload(*): void}, props: {stepActive: {default: number, type: Number | NumberConstructor}, detailInfo: {type: Object | ObjectConstructor, required: boolean}, stepList: {default: function(): [], require: boolean, type: Array | ArrayConstructor}, title: String | StringConstructor}}}, data(): {zjControl: {queryMyEbContractDetail: *}, detailInfo: {}, stepList: [{title: string, desc: string},{title: string, desc: string},{title: string, desc: string},{title: string, desc: string},{title: string, desc: string}]}, created(): void, methods: {getDetail(): void}}}>), meta: {notRequireAuth: boolean, refreshIndex: number, isMock: boolean, keepAlive: boolean, root: string, title: string}, name: string},{path: string, component: (function(): Promise<{readonly default?: {data(): {zjControl: {getEnterprise: function(): string}, searchForm: {issueEntName: string, ebillAmtEnd: string, ebillCode: string, issueDateEnd: string, issueDateStart: string, expireDateEnd: string, expireDateStart: string, ebillAmtStart: string}, list: [{field1: string, field3: string, field2: string, field4: string}]}, created(), methods: {toSign(*): void}}}>), meta: {notRequireAuth: boolean, refreshIndex: number, isMock: boolean, keepAlive: boolean, root: string, title: string}, name: string},{path: string, component: (function(): Promise<{readonly default?: {components: {DetailPage: {data(): {zjControl: {downApi: *}, quotaList: [{field1: string, field3: string, field2: string, field4: string}], fileList: [{field1: string, field3: string, field2: string, field5: string, field4: string}]}, methods: {toDownload(*): void}, props: {stepActive: {default: number, type: Number | NumberConstructor}, detailInfo: {type: Object | ObjectConstructor, required: boolean}, stepList: {default: function(): [], require: boolean, type: Array | ArrayConstructor}, title: String | StringConstructor}}}, data(): {stepList: [{title: string, desc: string},{title: string, desc: string},{title: string, desc: string},{title: string, desc: string},{title: string, desc: string}]}, methods: {toApply(): void, back(): void}}}>), meta: {notRequireAuth: boolean, refreshIndex: number, isMock: boolean, keepAlive: boolean, root: string, title: string}, name: string},{path: string, component: (function(): Promise<{readonly default?: {data(): {zjControl: {}, searchForm: {issueEntName: string, ebillAmtEnd: string, ebillCode: string, issueDateEnd: string, issueDateStart: string, expireDateEnd: string, expireDateStart: string, ebillAmtStart: string}, list: [{field1: string, field6: string, field3: string, field2: string, field5: string, field4: string}]}, created(), methods: {toReview(*): void}}}>), meta: {notRequireAuth: boolean, refreshIndex: number, isMock: boolean, keepAlive: boolean, root: string, title: string}, name: string},null,null]}
 */
const contractManageRouter = [
  {
    path: '/ebContractManageEnterprise',
    name: 'ebContractManageEnterprise',
    component: () => import('../views/contractManage/factoringContract/query/index.vue'),
    meta: {
      title: '我签约的保理合同',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/mySignContractDetail',
    name: 'mySignContractDetail',
    component: () => import('../views/contractManage/factoringContract/query/detailPage/index.vue'),
    meta: {
      title: '合同签约详情',
      parent: 'ebContractManageEnterprise',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/ebContractApply',
    name: 'ebContractApply',
    component: () => import('../views/contractManage/factoringContract/apply/index.vue'),
    meta: {
      title: '保理合同签约申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignApply',
    name: 'contractSignApply',
    component: () => import('../views/contractManage/factoringContract/apply/detailPage/index.vue'),
    meta: {
      title: '合同签约申请',
      parent: 'ebContractApply',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/ebContractApplyReview',
    name: 'ebContractApplyReview',
    component: () => import('../views/contractManage/factoringContract/review/index.vue'),
    meta: {
      title: '保理合同签约复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignReview',
    name: 'contractSignReview',
    component: () => import('../views/contractManage/factoringContract/review/detailPage/index.vue'),
    meta: {
      title: '合同签约复核',
      parent: 'ebContractApplyReview',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignReview2',
    name: 'contractSignReview2',
    component: () => import('../views/contractManage/factoringContract/review/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '合同签约复核122',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  }
]
export default contractManageRouter
