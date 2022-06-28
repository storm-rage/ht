export default  {
  data(){
    return {
      //用于改变Input类型
      passw:"password",
      //用于更换Input中的图标
      icon:"el-input__icon el-icon-view",
    }
  },
  methods:{
    //密码的隐藏和显示
    showPass(){
      //点击图标是密码隐藏或显示
      if( this.passw=="text"){
        this.passw="password";
        //更换图标
        this.icon="el-input__icon el-icon-view";
      }else {
        this.passw="text";
        this.icon="el-input__icon el-icon-orange";
      };
    }
  }
}
