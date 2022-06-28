export default {
  'post|/mock/api/common/get-auth-info':({body}) => {
    return {
      code: 200,
      message:'操作成功',
      success:true,
      data: JSON.parse(body)
    }
  }
}
