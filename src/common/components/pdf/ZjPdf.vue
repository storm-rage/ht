<template>
  <div id="sw-pdf">
    <img :src="pdfUrl"/>
  </div>
</template>

<script>
    export default {
        name: "ZjPdf",
        props:{
          item:{
            type:Object,
            default(){
              return {}
            }
          }
        },
        data(){
          return{
            pdfUrl:'',
          }
        },
        watch:{
          item:{
            handler(item){
              if(JSON.stringify(item) === '{}'){ return }
              this.init(item)
            },
            deep:true,
            immediate:true
          }
        },
        methods: {
          init(item){
            let params = {
              fileUrl:item.fileId,
              fileId:item.fileId,
              fileName:item.fileName.indexOf('.pdf') ? item.fileName : item.fileName + '.pdf' ,
            }
            this.$api.baseCommon.downloadPdf(params).then(res => {
              let that = this
              let dataInfo = res.data
              let reader = new window.FileReader()
              reader.readAsArrayBuffer(dataInfo)
              reader.onload = function (e) {
                let result = e.target.result
                let contentType = dataInfo.type || 'pdf'
                let blob = new Blob([result], { type: 'contentType' })
                let url = window.URL.createObjectURL(blob)
                that.blobTObase64(url,that.blobTObase64END)
              }
            })
          },
          blobTObase64(blob,callback){
            let that = this
            let reader = new window.FileReader();
            reader.onload = (e) => {
              if (callback) {
                callback(e.target.result)
              }
            }
            // reader.readAsDataURL(blob)
          },
          blobTObase64END(result){
            console.error(result)
          }
        }
    }
</script>

<style scoped>

</style>
