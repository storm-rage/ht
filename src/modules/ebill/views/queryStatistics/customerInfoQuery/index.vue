<template>
  <div>
    <zj-content-container>
      <!--  客户信息查询  -->
      <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
        <zj-list-layout>
          <template slot="leftBtns">
            <vxe-button
              class="export"
              icon="el-icon-download"
              @click="toExport"
              :api="zjBtn.exportEntInfoList"
              >导出</vxe-button
            >
          </template>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="企业名称">
                <el-input
                  v-model.trim="searchForm.nameLike"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="平台客户类型">
                <el-select
                  v-model="searchForm.entType"
                  placeholder="请选择"
                  filterable
                  :popper-append-to-body="false"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="item in dictionary.entType"
                    :key="item.code"
                    :label="item.desc"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建日期">
                <zj-date-range-picker
                  :startDate.sync="searchForm.finalAuditDatetimeStart"
                  :endDate.sync="searchForm.finalAuditDatetimeEnd"
                ></zj-date-range-picker>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input
                  v-model.trim="searchForm.bizLicence"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="平台企业编码">
                <el-input
                  v-model.trim="searchForm.code"
                  @keyup.enter.native="search"
                ></el-input>
              </el-form-item>
              <el-form-item label="平台客户状态">
                <el-select
                  v-model="searchForm.state"
                  placeholder="请选择"
                  filterable
                  :popper-append-to-body="false"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="item in dictionary.state"
                    :key="item.code"
                    :label="item.desc"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
          <zj-table
            ref="searchTable"
            :params="searchForm"
            :dataList="list"
            :api="zjControl.queryEntInfo"
          >
            <zj-table-column title="平台企业编码" width="150px">
              <template v-slot="{ row }">
                <zj-button
                  type="text"
                  @click="$router.push({name: 'entInfoQueryDetail', query: {rowId: row.id}})"
                  >{{ row.code }}</zj-button
                >
              </template>
            </zj-table-column>
            <zj-table-column field="name" title="企业名称" minWidth="130px" />
            <zj-table-column
              field="entType"
              title="平台客户类型"
              :formatter="obj => typeMap(dictionary.entType, obj.cellValue)"
              width="127px"
            />
            <zj-table-column
              field="isHtEnterprise"
              title="是否海天集团"
              :formatter="obj => (obj.cellValue == 1 ? '是' : '否')"
              width="97px"
            />
            <zj-table-column
              field="isOpenProduct"
              title="是否已开通产品"
              :formatter="obj => (obj.cellValue == 1 ? '是' : '否')"
              width="127px"
            />
            <zj-table-column
              field="isFinancing"
              title="是否已有融资"
              :formatter="obj => (obj.cellValue == 1 ? '是' : '否')"
              width="127px"
            />
            <zj-table-column
              field="bizLicence"
              title="统一社会信用代码"
              minWidth="125px"
            />
            <zj-table-column
              field="state"
              title="平台客户状态"
              :formatter="obj => typeMap(dictionary.state, obj.cellValue)"
              width="100px"
            />
            <zj-table-column
              field="finalAuditDatetime"
              title="创建日期"
              width="167px"
              :formatter="date"
            >
              <!-- <template v-slot="{ row }">
                {{ date(row.finalAuditDatetimeStart)
                }}{{ row.finalAuditDatetimeEnd ? `~${date(row.finalAuditDatetimeEnd)}` : '' }}
              </template> -->
            </zj-table-column>
          </zj-table>
        </zj-list-layout>
      </div>
    </zj-content-container>
  </div>
</template>
<script>
export default {
  name: 'entInfoQuery',
  components: {},
  data () {
    return {
      zjControl: {
        getDirectory: this.$api.entInfoQuery.getDirectory, // 数据字典
        exportEntInfoList: this.$api.entInfoQuery.exportEntInfoList,  // 导出
        queryEntInfo: this.$api.entInfoQuery.queryEntInfo //查询
      },
      searchForm: {
        nameLike: '',
        entType: '',
        finalAuditDatetimeStart: '',
        finalAuditDatetimeEnd: '',
        bizLicence: '',
        code: '',
        state: ''
      },
      list: [],
      dictionary: {}
    }
  },
  methods: {
    getDictionary () {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toExport () {
      this.zjControl.exportEntInfoList(this.searchForm)
    }
  },
  created () {
    this.getApi()
    this.getDictionary()
  }
}
</script>
