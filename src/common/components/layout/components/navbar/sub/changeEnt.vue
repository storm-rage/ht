<template>
  <div class="navbar-change-ent">
    <vxe-button round transfer placement="bottom" v-if="currentEnt.entName">
      <template #default>{{currentEnt.entName}}</template>
      <template #dropdowns v-if="isChangeEnt">
        <vxe-button type="text"
                    @click="toChangeEnt(item)"
                    :status="item.entId===currentEnt.entId?'primary':''"
                    v-for="(item,index) in entList"
                    :key="index">{{item.entName}}</vxe-button>
      </template>
    </vxe-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo,
      entList: state => state.enterprise.entList,
      isChangeEnt: (state) => {
        return state.enterprise.entList&&state.enterprise.entList.length;
      }
    })
  },
  mounted() {
    this.currentEnt = this.entInfo;
  },
  data () {
    return {
      currentEnt: {}
    }
  },
  methods: {
    toChangeEnt (item) {
      if (item.entId==this.currentEnt.entId) {
        return;
      } else {
        this.$api.baseCommon.changeProject({
          loginChannel: '0',
          entId: item.entId
        }).then(ret => {
          this.currentEnt = item;
          const data = ret.data;
          const loginRes = Object.assign({}, this.userInfo, data,{currentEnt: item});
          if (data.faceCheck || data.userServiceAgreementFlag === '1') {
            const loginSuccess = JSON.parse(JSON.stringify({
              loginRes
            }));
            sessionStorage.setItem('frLoginRes',JSON.stringify(loginRes))
            this.goChild('faceRecognition',loginSuccess)
          } else {
            this.$store.dispatch('enterprise/changeEnt', {data,entInfo: item}).then(() =>  {
              this.$store.commit('tab/tabClear');
              window.location.href='/home';
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less">
@import "~@assets/less/variables";
.navbar-change-ent {
  //margin: 10px 20px;
  .vxe-button--dropdown{
    .vxe-button {
      color: #303133;
      font-weight: 400;
      border: 1px solid #F5F7FA;
      background-color: #F5F7FA;
      &:not(.is--disabled):hover {
        color: @primary-main-color;
        background-color:#F5F7FA;
      }
    }
  }
}
</style>
