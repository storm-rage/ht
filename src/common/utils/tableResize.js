export default {
  data(){
    return {

    }
  },
  methods:{
    createVar(list){
      list.map(item => {
        this.$set(
          this,item,''
        )
      })
    },
    windowResize(){

    }
  },
  mounted(){
    let _this = this
    window.onresize = () => {
      _this.windowResize()
    }
    _this.windowResize()
  }
}
