import {MessageBox} from 'element-ui'
const zjConfirm = function ({title,message,btnCon = '确定',sucMethod,errMethod,scfb=true,sccb=true}) {
  MessageBox.confirm(message,title,{
    showConfirmButton:scfb,
    confirmButtonText: btnCon,
    confirmButtonClass: 'ensureBtn',
    showCancelButton:sccb,
    cancelButtonText:'取消',
    cancelButtonClass:'cancelBtn',
    type: '',
    showClose:true,
    closeOnPressEscape:false,
    closeOnClickModal:false,
    center:true,
  }).then(()=>{
    if(sucMethod && typeof(sucMethod) === 'function'){
      sucMethod()
    }
  }).catch(()=>{
    if(errMethod && typeof(errMethod) === 'function'){
      errMethod()
    }
  })
}

export default zjConfirm
