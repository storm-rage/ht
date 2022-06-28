// 定义常量

// 流程提示语
export const bpmSPlaceholder = '请输入流程标题、工单号...';

// 流程提示语
export const emptyText = '暂无内容';

//文件柜提示语
export const fileText = "请输入文档名称、关键词";

// 每页数据条数  初定义 15条
export const initpageSize = 15;
export const pagesizeSelect = [15, 30, 50, 100, 200];

// 流程代理激活状态 enabled:true 启用1 禁止0

export function isIEs()
{
    if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
    else
    return false;
}
export const isIE = isIEs();

// 判断系统是否为IOS
export function isIOSs()
{
    let u = navigator.userAgent;
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) //ios终端
    return true;
    else
    return false;
}

export const isIOS = isIOSs();

export const agentEnabledObj = [{
    value: true,
    status: '1'
  },
  {
    value: false,
    status: '0'
  }
]
export const setECodeStatus = [
{label: '威宁集团',value: 'WEINING'},
{label: '威宁生态园',value: 'WEININGWXSHZJD'},
{label: '南宁银河',value: 'WEININGNNYH'},
{label: '五象山庄酒店',value: 'WEININGSHTY'},
{label: '广西新世界',value: 'WEININGGXXSHJ'},
{label: '靖西分公司',value: 'WEININGJXFGS'},
{label: '政源印刷厂',value: 'WEININGZYYSC'},
{label: '威润工贸',value: 'WEININGWRGM'},
{label: '乡镇企业供销公司',value: 'WEININGXZHQYGXS'},
{label: '住宅建设公司',value: 'WEININGZHZHJSGS'},
{label: '一衡开发公司',value: 'WEININGYHKFGS'},
{label: '国立公司',value: 'WEININGGLIGS'},
{label: '科瑞公司',value: 'WEININGKRGS'},
{label: '地产业公司',value: 'WEININGDCYGS'},
{label: '平云公司',value: 'WEININGPYGS'},
{label: '兴威公司',value: 'WEININGXWGS'},
{label: '韬云公司',value: 'WEININGDYGS '},
{label: '威宁经营',value: 'WEININGJINGYING'},
{label: '南宁百货',value: 'NNBH'},
{label: '宁家鲜生',value: 'NINGJIAXIANSHENG'},
{label: '威宁租赁',value: 'WEININGZULIN'},
{label: '南宁学院',value: 'NANNINGXUEYUAN'},
{label: '威宁建投公司',value: 'WEININGJIANTOU'},
{label: '威宁房地产公司',value: 'NANNINGDICHAN'},
{label: '威宁市场公司',value: 'WEININGSHICHANG'},
{label: '储备粮公司',value: 'CHUBEILIANG'},
{label: '威宁资产公司',value: 'WEININGZICHAN'},
{label: '信创公司',value: 'WEININGXINCHUANG'},
{label: '威宁文体公司',value: 'WEININGWENHUA'},
{label: '融达小贷公司',value: 'RONDAXIAODAI'},
{label: '蔬菜公司',value: 'SHUCAIGS'},
{label: '江南分公司',value: 'JIANGNANFGS'},
{label: '江北分公司',value: 'JIANGBEIFGS'},
{label: '南宁百货大楼公司',value: 'NANNINGBAIHUO'},
{label: '威宁邻家公司',value: 'WEININGLINJIA'},
{label: '威宁捷信公司',value: 'WEININGJIEXIN'},
{label: '威宁酒店公司',value: 'WEININGJIUDIAN'},
{label: '粮食物流产业园区公司',value: 'LIANGSHIWULIU'},
{label: '商场分公司',value: 'SHANGCHANGFGS'},
{label: '威富益公司',value: 'WEIFUYIGS'},
{label: '新阳造纸厂',value: 'XINYANGZAOZHI'}]

//定义字段  列表 生成方式 自定义表：0，由表单生成：1
export const genByFormStatus = [{
  value: '0',
  label: '自定义表'
}, {
  value: '1',
  label: '由表单生成'
}, {
  value: '',
  label: '全部'
}]

//定义字段  列表 是否生成	未生成:0,已生成:1
export const isPublishedStatus = [{
  value: '0',
  label: '未生成'
}, {
  value: '1',
  label: '已生成'
}, {
  value: '',
  label: '全部'
}]

//定义字段  列表 Q_isMain_SN	int	是否主表	主表：1，子表：0
export const isMainStatus = [{
  value: '0',
  label: '子表'
}, {
  value: '1',
  label: '主表'
}, {
  value: '',
  label: '全部'
}]

// 流程监控 任务状态
export const taskStatus = [{
    value: '挂起',
    status: '0'
  },
  {
    value: '正在运行',
    status: '1'
  },
  {
    value: '结束状态',
    status: '2'
  },
  {
    value: '人工终止',
    status: '3'
  },
  {
    value: '草稿',
    status: '4'
  },
  {
    value: '已撤销',
    status: '5'
  },
  {
    value: '已驳回',
    status: '6'
  },
  {
    value: '已追回',
    status: '7'
  },
  {
    value: '逻辑删除',
    status: '10'
  },
  {
    value: '子流程草稿',
    status: '40'
  },
  {
    value: '',
    status: ''
  }
]

//流程监控 操作日志 类型

export const operatortypeStatus = [{
  value: '0',
  label: '启动流程'
}, {
  value: '1',
  label: '交办'
}, {
  value: '2',
  label: '追回'
}, {
  value: '3',
  label: '删除流程实例'
}, {
  value: '4',
  label: '同意（投票）'
}, {
  value: '5',
  label: '反对（投票）'
}, {
  value: '6',
  label: '弃权（投票）'
}, {
  value: '7',
  label: '补签'
}, {
  value: '8',
  label: '驳回'
}, {
  value: '9',
  label: '驳回到发起人'
}, {
  value: '24',
  label: '驳回任意节点'
}, {
  value: '10',
  label: '删除任务'
}, {
  value: '11',
  label: '执行代理任务'
}, {
  value: '13',
  label: '锁定任务'
}, {
  value: '14',
  label: '任务解锁'
}, {
  value: '15',
  label: '添加意见'
}, {
  value: '16',
  label: '任务指派'
}, {
  value: '17',
  label: '修改任务所有人'
}, {
  value: '18',
  label: '结束任务'
}, {
  value: '19',
  val: '更改执行路径'
}, {
  value: '20',
  label: '收回任务'
}, {
  value: '21',
  label: '结束流程实例'
}, {
  value: '22',
  label: '保存草稿'
}, {
  value: '23',
  label: '办结转发'
},{
  value: '25',
  label: '删除流程草稿'
}]

//会议设备管理  设备是否公用
export const deviceIsPublic = [{
    value: '0',
    label: '否'
  },
  {
    value: '1',
    label: '是'
  }
]

// 公告状态  是否发布
export const bulletinIsPublish = [
  {
    value: '0',
    label: '未发布'
  },{
    value: '1',
    label: '已发布'
  }
]

//流程选择器 流程列表 状态0:未发布1:发布2.禁用3.禁用,并禁用实例 4.测试状态
export const flowStatus = [{
  id: '0',
  value: '未发布'
}, {
  id: '1',
  value: '发布'
}, {
  id: '2',
  value: '禁用'
}, {
  id: '3',
  value: '禁用,并禁用实例'
}, {
  id: '4',
  value: '测试状态'
}]

