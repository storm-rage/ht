/**
 * 产品类型常量
 * @type {{DDBL: string}}
 */
export const ProductType = {
  // 订单保理
  DDBL: 'DDBL',
  // 电子债券凭证
  RD: 'RD',
  // 放贷
  JXD: 'JXD'
}
/***
 * 操作标识
 * @type {{ADD: string, UPDATE: string, DEL: string}}
 */
export const OperateFlag = {
  // 新增
  ADD: 'A',
  //修改
  UPDATE: 'U',
  // 删除
  DEL: 'D'
}
/**
 * 工作流的操作标识
 * @type {{REJECT: string, PASS: string, BACK: string}}
 */
export const OperResult = {
  // 通过
  PASS: '0',
  // 拒绝
  REJECT: '1',
  // 驳回
  BACK: '2'
};
