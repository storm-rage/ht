<template>
  <el-upload class="zj-upload" ref="zjUpload" v-bind="attrs" v-if="show">
    <template v-if="$slots.default"><slot></slot></template>
    <template v-if="$slots.trigger" v-slot:trigger><slot name="trigger"></slot></template>
    <template v-if="$slots.tip" v-slot:tip><slot name="tip"></slot></template>
  </el-upload>
</template>

<script>
export default {
  name: 'ZjUpload',
  props: {
    // 权限api
    api: [Function, String],
    /** upload基本属性 */
    // 必选参数，上传的地址
    action: { type: String, default: '//' },
    // 设置上传的请求头部
    headers: Object,
    // 是否支持多选文件
    multiple: Boolean,
    // 上传时附带的额外参数
    data: Object,
    // 上传的文件字段名
    name: String,
    // 支持发送 cookie 凭证信息
    withCredentials: Boolean,
    // 是否显示已上传文件列表
    showFileList: Boolean,
    // 是否启用拖拽上传
    drag: Boolean,
    // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
    accept: String,
    // 点击文件列表中已上传的文件时的钩子 unction(file)
    onPreview: Function,
    // 文件列表移除文件时的钩子 function(file, fileList)
    onRemove: Function,
    // 文件上传成功时的钩子 function(response, file, fileList)
    onSuccess: Function,
    // 文件上传失败时的钩子 function(err, file, fileList)
    onError: Function,
    // 文件上传时的钩子 function(event, file, fileList)
    onProgress: Function,
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 function(file, fileList)
    onChange: Function,
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 function(file)
    beforeUpload: Function,
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 function(file, fileList)
    beforeRemove: Function,
    // 文件列表的类型
    listType: String,
    // 是否在选取文件后立即进行上传
    autoUpload: { type: Boolean, default: true },
    // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] array
    fileList: Array,
    // 覆盖默认的上传行为，可以自定义上传的实现
    httpRequest: Function,
    // 是否禁用
    disabled: Boolean,
    // 最大允许上传个数
    limit: Number,
    // 文件超出个数限制时的钩子 function(files, fileList)
    onExceed: Function,
    // 支持的附件类型
    acceptType: String,
    // 支持上传的文件大小，默认5M
    uploadSize: {
      type: String,
      default: 5
    }
  },
  computed: {
    // upload基本属性
    attrs () {
      return {
        action: this.action,
        headers: this.headers,
        multiple: this.multiple,
        data: this.data,
        name: this.name,
        withCredentials: this.withCredentials,
        showFileList: this.showFileList,
        drag: this.drag,
        accept: this.accept,
        onPreview: this.onPreview,
        onRemove: this.onRemove,
        onSuccess: this.onSuccess,
        onError: this.onError,
        onProgress: this.onProgress,
        onChange: this.onChange,
        beforeUpload: this.handleBeforeFileUpload,
        beforeRemove: this.beforeRemove,
        listType: this.listType,
        autoUpload: this.autoUpload,
        fileList: this.fileList,
        httpRequest: this.httpRequest,
        disabled: this.disabled,
        limit: this.limit,
        onExceed: this.onExceed
      }
    },
    // 权限控制 显示/隐藏
    show () {
      if (typeof this.api === 'function' || typeof this.api === 'undefined') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    /**
     * 自动文件上传前事件
     * @param file
     */
    handleBeforeFileUpload(file){
      if (this.acceptType) {
        const fileName = file.name;
        if (fileName) {
          const names = fileName.split('.');
          const fileType = names[1].toUpperCase();
          const supportFileTypes = this.acceptType.toUpperCase().split(',');
          if (!supportFileTypes.includes(fileType)) {
            this.$messageBox({
              type: 'warning',
              content: `上传文件格式有误！只支持上传${supportFileTypes.join('、')}格式！`,
              title: '提示',
              showConfirmButton: true,
              center: true
            })
            return false;
          }
        }
      }else if (this.uploadSize) {
        const toM = file.size / 1024 / 1024;
        if (toM > this.uploadSize) {
          this.$messageBox({
            type: 'warning',
            content: `上传文件过大，请控制文件大小在${this.uploadSize}M以内！`,
            title: '提示',
            showConfirmButton: true,
            center: true
          })
          return false;
        }
      }
      if (this.beforeUpload && typeof this.beforeUpload === 'function') {
        return this.beforeUpload(file);
      }
      return true
    },
    /** upload基本方法 */
    // 清空已上传的文件列表（该方法不支持在 before-upload 中调用）
    clearFiles () {
      return this.$refs.zjUpload.clearFiles()
    },
    // 取消上传请求 （ file: fileList 中的 file 对象 ）
    abort (file) {
      return this.$refs.zjUpload.abort(file)
    },
    // 手动上传文件列表
    submit () {
      return this.$refs.zjUpload.submit()
    }
  }
}
</script>

<style lang="less">
.zj-upload{
  //按钮
  .trigger{
    border-radius: 0!important;
    color: #999999;
    border-color: #999999;
    &:hover{
      border-color: #5494f2!important;
    }
    &:focus{
      border-color: #999999!important;
      box-shadow:0 0 0 0 rgba(0,0,0,0) !important;
      -webkit-box-shadow:0 0 0 0 rgba(0,0,0,0) !important;
    }
  }
  //提示文字
  .tip{
    color:#999999;
    margin-left:0.4em;
    font-size: 12px;
  }
}
</style>
