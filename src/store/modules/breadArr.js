//从后往前寻找
function backward(rList,name){
  let newArr = []
  let key = true

  if(Array.isArray(rList)){
    for(let i=0; i < rList.length; i++){

      if(!key){break}
      if(rList[i].name === name){
        newArr.unshift(rList[i])
        if(rList[i].meta.newParent){
          newArr = [...newArr,...backward(rList,rList[i].meta.newParent)]
        }
        else if(rList[i].meta.parent){
          newArr = [...newArr,...backward(rList,rList[i].meta.parent)]
        }
        // 是否还需要根标题
        else if(rList[i].meta.root){
          newArr = [...newArr,...[{name:'',meta:{title:rList[i].meta.root}}]]
        }

      }else if(rList[i].children){
        newArr = [...newArr,...backward(rList[i].children,name)]
      }

      if(newArr.length > 0){
        key = false
      }
    }
  }

  return newArr
}

export default (rList,name) => {
  let breArr = backward(rList,name)
  // breArr.push({name:'home',meta:{title:'首页'}})
  return breArr.reverse()
}
