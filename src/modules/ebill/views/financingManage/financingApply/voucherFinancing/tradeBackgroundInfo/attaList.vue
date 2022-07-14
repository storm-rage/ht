<template>
  <div>
    <zj-table ref="searchTable" :dataList="list" >
      <zj-table-column field="field2" title="序号"/>
      <zj-table-column field="field3" title="文件名称"/>
      <zj-table-column title="操作" fixed="right">
        <template v-slot="{row}">
          <zj-button type="text" @click="downs(row)">下载</zj-button>
        </template>
      </zj-table-column>
    </zj-table>

  </div>
</template>

<script>
export default {
  name: "attaList",
  data() {
    return {
      form: {},
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
    }
  },
  methods: {
    downs(row){

    },
  },
}
</script>

<style scoped>

</style>
