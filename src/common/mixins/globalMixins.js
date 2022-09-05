import {windowLsStorege} from '@utils/storageUtils';
export default {
  install(Vue){
    Vue.mixin({
      data(){
        return {
          zjBtn: {},
          row: {},
        }
      },
      methods:{
        notEmptyCheck(form,rules,whiteList = []){
          let formSplit = form.split('.')
          let rulesArr = []
          for(let key in this[rules]){
            if(!whiteList.some(item => item === key)){
              rulesArr.push(key)
            }
          }
          let mesKey = true
          for(let i=0; i<rulesArr.length; i++){
            if(!mesKey){ break }
            if(formSplit.length > 1){
              if(
                  !this[formSplit[0]][formSplit[1]][rulesArr[i]]
                  ||
                  ( Array.isArray(this[formSplit[0]][formSplit[1]][rulesArr[i]]) && this[formSplit[0]][formSplit[1]][rulesArr[i]].length === 0 )
              ){
                this.$messageBox({
                  type:'warning',
                  content:this[rules][rulesArr[i]][0].message
                })
                mesKey = false
              }
            }else{
              if( !this[form][rulesArr[i]]
                  ||
                  ( Array.isArray(this[form][rulesArr[i]]) && this[form][rulesArr[i]].length === 0 )
              ){

                if(this.$messageBox){
                  this.$messageBox({
                    type:'warning',
                    content:this[rules][rulesArr[i]][0].message
                  })
                }else{
                  this.$message({
                    type:'error',
                    message:this[rules][rulesArr[i]][0].message
                  })
                }
                mesKey = false
              }
            }

          }
          return mesKey
        },
        // 请求接口权限
        getApi (params) {
          let zjObj = {}
          if (params) { // 引用注入api
            zjObj = Object.assign({},params)
          } else { // 手动注入api
            zjObj = Object.assign({},this.zjControl)
          }
          this.$api.baseCommon.getPermission(zjObj).then(res => {
            this.zjBtn = res
            if(this.getApiAfter && typeof(this.getApiAfter) === 'function'){
              this.getApiAfter()
            }
          })
        },

        getPermission (params) {
          this.$api.baseCommon.getPermission(params).then(ret => {
            this.zjBtn = ret
            if(this.getApiAfter && typeof(this.getApiAfter) === 'function'){
              this.getApiAfter()
            }
          })
        },
        search (boo = true,Ref = 'searchTable') {
          if(this.beforeSearch && typeof(this.beforeSearch) === 'function'){
            this.beforeSearch()
          }
          if (this.$refs[Ref]){
            this.$refs[Ref].iRefresh(boo)
          }else if (this.$parent.$refs[Ref]) {
            this.$parent.$refs[Ref].iRefresh(boo)
          }else if (this.$parent.$parent.$refs[Ref]) {
            this.$parent.$parent.$refs[Ref].iRefresh(boo)
          }
        },
        resetSearch (boo) {
          if(this.beforeResetSearch && typeof(this.beforeResetSearch) === 'function'){
            this.beforeResetSearch()
          }

          if (!this.searchForm&&this.$parent.$data.searchForm) {
            this.resetSearchForm(this.$parent.$data.searchForm)
          }else if (!this.searchForm&&this.$parent.$parent.$data.searchForm) {
            this.resetSearchForm(this.$parent.$parent.$data.searchForm)
          }else{
            this.resetSearchForm(this.searchForm)
          }

          if(this.afterResetSearch && typeof(this.afterResetSearch) === 'function'){
            this.afterResetSearch()
          } else if (this.$parent && this.$parent.afterResetSearch && typeof(this.$parent.afterResetSearch) === 'function') {
            this.$parent.afterResetSearch()
          }
          this.search(boo)
        },
        resetSearchForm(searchForm){
          for(let key in searchForm){
            if(this.searchFormWhiteList && this.searchFormWhiteList.findIndex(item => item===key) >=0){
              searchForm[key] = searchForm[key]
            }else if(Array.isArray(searchForm[key])){
              searchForm[key] = []
            }else if(typeof(searchForm[key]) === 'boolean'){
              searchForm[key] = false
            }else{
              this.$set(searchForm,key,'');
            }
          }
        },
        goChild(routerName,row = {}, type){
          if(this.beforeGoChild && typeof(this.beforeGoChild) === 'function'){
            this.beforeGoChild()
          }
          let fromRouteName = this.$route.name
          this.$router.push({
            name:routerName,
            params:{
              rowData:row
            }
          }).then(()=>{
            // 是否是待办里点处理，此时的route已是跳转后的route
            if(type=='todo') this.$route.meta.newParent = fromRouteName
          })
          this.$nextTick(() => {
            this.tabRefresh()
          })

        },
        getRow(){
          let rowData = this.$route.params.rowData
          if (rowData !== undefined) {
            windowLsStorege.setItem( `${this.$route.name}Data`,JSON.stringify(rowData))
          }
          if (windowLsStorege.getItem(`${this.$route.name}Data`) && rowData === undefined) {
            rowData = JSON.parse(windowLsStorege.getItem(`${this.$route.name}Data`))
          }
          this.row = Object.assign({}, rowData)
        },
        removeRow(){
          windowLsStorege.removeItem(`${this.$route.name}Data`)
        },
        goParent(parentName, boo=true){
          if(this.beforeGoParent && typeof(this.beforeGoParent) === 'function'){
            this.beforeGoParent()
          }
          //父,todo:需要改造，上面goChild已改造
          let rItem = {
            name: typeof(parentName) !== 'object' && parentName ? parentName : this.row.parent ||  this.$route.meta.newParent || this.$route.meta.parent,
            meta:Object.assign({},this.$route.meta),
            params:{
              boo
            }
          }
          this.$store.commit('tab/tabAdd',rItem)
          //子
          this.tabDel();
        },
        tabDel(){
          let rItem = {
            name:this.$route.name,
          }
          this.$store.commit('tab/tabDel',rItem)
          this.$store.dispatch('tab/removeCache', rItem)
        },
        tabRefresh(){
          let rItem = {
            name:this.$route.name,
          }
          this.$store.commit('tab/tabRefresh',rItem)
        },
        enterSearch(){
          let enterKey = false
          for(let key in this.searchForm){
            if(this.searchForm[key]){
              enterKey = true
            }
          }
          if(enterKey){
            this.search()
          }
        },
      }
    })
  }
}
