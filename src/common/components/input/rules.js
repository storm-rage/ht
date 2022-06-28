export default {
  data(){
    //命名规范:  userForm -- userModel -- userRules  -- userList
    //传入： beforeRules('uesr')
  },
  methods:{
    //检测是否必填:  refs list
    beforeRules(Refs){
      if(!Refs){return false}
      for(let key in this[Refs+'Model']){
        //当为空时则不进行报错
        if(!this[Refs+'Model'][key] && this[Refs+'Rules'][key][0].required){
          this.$alert(this[Refs+'Rules'][key][0].message)
        }
      }
    }
  }
}
