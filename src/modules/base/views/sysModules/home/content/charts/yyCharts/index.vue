<template>
  <div>
    <zj-header :title="title">
      <template slot="right">
        <el-radio-group v-model="currentComp" size="mini">
          <el-radio-button label="financing">融资金额</el-radio-button>
          <el-radio-button label="payment">放款总额</el-radio-button>
        </el-radio-group>
      </template>
    </zj-header>
    <component :is="currentComp" :height="height" :extendConfig="extendConfig"></component>
  </div>
</template>
<script>
import financing from './financing';
import payment from './payment';
export default {
  components: {financing,payment},
  props: {
    title: String,
    height: String,
    extendConfig: Object
  },
  data () {
    return {
      currentComp: 'financing'
    }
  }
};
</script>
