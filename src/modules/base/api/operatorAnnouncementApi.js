/**
 * 公告维护接口
 */
 import request from '@common/axios/request'

 const operatorAnnouncement = {
    //新增公告信息
    sysNoticeAdd:(params) => {
      return request.post('/sys-notice/add-sys-notice',{params})
    },
    //删除系统公告
    sysNoticeAddDelete:(params) => {
      return request.post('/sys-notice/del-sys-notice',{params})
    },
    //查询系统公告集1
    sysNoticeAddPage:(params) => {
      return request.get('/sys-notice/query-sys-notice-page',{params})
    },
    //查询系统公告集2
    relationUpdate:(params) => {
      return request.get('//sys-notice/query-sys-notice-page-for-ent',{params})
    },
    //修改系统公告
    sysNoticeAddAller:(params) => {
      return request.post('/sys-notice/update-sys-notice',{params})
    },
    //系统公告详情
    sysNoticeAddDetails:(params) => {
      return request.post('/sys-notice/get-sys-notice-details',{params})
    },
    //数据字典
    sysNoticeAddDirectory:(params) => {
      return request.get('/sys-notice/get-notice-directory',{params})
    },
  }
  
  export default operatorAnnouncement