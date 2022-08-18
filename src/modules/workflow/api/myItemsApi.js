//我的代办
import request from '@common/axios/request'
const myItems = {
  //待办
  myTodoList: (params) => {
    return request.get('/my-todo/todo-list', { params })
  },
  //已办
  myTodoDoneList: (params) => {
    return request.get('/my-todo/done-list', { params })
  },
  //已办结
  myTodoDoneFinishedList: (params) => {
    return request.get('/my-todo/done-finished-list', { params })
  }
}
export default myItems
