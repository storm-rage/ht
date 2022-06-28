<template>
  <el-scrollbar ref="tabScroll" :vertical="false" class="tab-scroll" @wheel.native.prevent="wheelScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4 // tagAndTagSpacing

export default {
  name: 'TabScrollPane',
  data() {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.tabScroll.$refs.wrap
    }
  },
  methods: {
    wheelScroll(e) {
      this.scrollWrapper.scrollLeft = this.scrollWrapper.scrollLeft - e.wheelDelta
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.tabScroll.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$parent.$refs.tab

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="less" >
.tab-scroll {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  /deep/ .el-scrollbar__bar {
    bottom: 0px;
  }
  /deep/ .el-scrollbar__wrap {
    height: 58px;
  }
}
</style>
<style lang="less">
  .is-horizontal{
    /*opacity: 1!important;*/
   .el-scrollbar__thumb {
     background: pink!important;
    }
  }

</style>
