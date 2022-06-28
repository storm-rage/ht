<template>
    <div class="zj-fold-item">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ZjFoldItem",
        data(){
          return {
            parentLevel:1
          }
        },
        methods:{
          sendParentItemHeight(){
            let evalStr = '$parent'
            for(let i=1;i<this.parentLevel;i++){
              evalStr += '.$parent'
            }
            let evalIncludes = eval(`this.${evalStr}.$el.className.split(' ').includes('zj-fold')`)
            if( evalIncludes ){

            }else{
              this.parentLevel ++
              this.sendParentItemHeight()
            }
          }
        },
        mounted() {
          this.$nextTick(() => {
            this.sendParentItemHeight()
          })
        }
    }
</script>

<style scoped>

</style>
