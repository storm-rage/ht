<template>
  <zj-content-container>
    <zj-list-layout ref="dd">
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm" class="search-form">
          <el-form-item label="企业名称：">
            <el-input
              v-model="searchForm.nameLike"
              placeholder=""
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="注册申请日期：" class="col-center">
            <zj-date-range-picker
              class="searchFormDate"
              :startDate.sync="searchForm.applyDatetimeStart"
              :endDate.sync="searchForm.applyDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="平台客户类型：" class="col-right">
            <el-select
              v-model="searchForm.entType"
              filterable
              placeholder="请选择"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in platFormAuditEntTypeList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input
              v-model="searchForm.serialNoLike"
              placeholder=""
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="企业注册状态：" class="col-right">
            <el-select
              v-model="searchForm.registerState"
              filterable
              placeholder="请选择"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in registerStateList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.tableApi"
      >
        <zj-table-column field="serialNo" title="申请流水号">
          <template v-slot="{ row }">
            <span
              class="table-elbill-code"
              @click="goChild('registerAuditApplyDetail', row)"
              >{{ row.serialNo }}</span
            >
          </template>
        </zj-table-column>
        <zj-table-column field="name" title="企业名称" />
        <zj-table-column field="entType" title="平台客户类型">
          <template v-slot="{ row }">
            <!-- 核心企业 -->
            <template v-if="row.entType === 'B'">
              {{ typeMap(directory.platFormAuditEntTypeList, row.entType) }}
            </template>
            <!-- 供应商 -->
            <template v-else-if="row.entType === 'S'">
              <!-- 直接供应商 -->
              <template v-if="row.supplierType === '01'">
                {{ typeMap(directory.platFormAuditEntTypeList, row.entType) }}
                ( 直接供应商 )
              </template>
              <!-- 间接供应商 -->
              <template v-else-if="row.supplierType === '02'">
                <!-- 有贸易关系 -->
                <template v-if="row.isTradeRelation === '1'">
                  <label>
                    {{
                      typeMap(directory.platFormAuditEntTypeList, row.entType)
                    }}
                    ( 间接供应商<span class="success">√</span> )
                  </label>
                </template>
                <!-- 无贸易关系 -->
                <template v-else>
                  <label>
                    {{
                      typeMap(directory.platFormAuditEntTypeList, row.entType)
                    }}
                    ( 间接供应商<span class="red">×</span> )
                  </label>
                </template>
              </template>
            </template>
            <template v-else>—</template>
          </template>
        </zj-table-column>
        <zj-table-column
          field="applyDatetime"
          title="申请时间"
          :formatter="formatterCellVal"
        />
        <zj-table-column
          field="registerState"
          title="企业注册状态"
          :formatter="
            (obj) => typeMap(directory.registerStateList, obj.cellValue)
          "
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="goChild('registerAuditApplyAudit', row)"
              v-if="row.registerState === '2' || row.registerState === '3'"
              >审核</zj-button
            >
            <zj-button
              type="text"
              :api="zjBtn.getCertUserInfo"
              @click="certificate(row)"
              v-else-if="row.registerState === '4'"
              >发证</zj-button
            >
            <span v-else>—</span>
          </template>
        </zj-table-column>
      </zj-table>
      <!-- 发证 -->
      <certificate
        ref="certificate"
        :zjControl="zjControl"
        :cBtn="zjBtn"
        :directory="directory"
        @close="certificate"
      />
    </zj-list-layout>
  </zj-content-container>
</template>

<script>
import certificate from "./commom/certificate.vue";
export default {
  components: { certificate },
  data() {
    return {
      zjControl: {
        getDirectory: this.$api.registerAudit.queryEntDataDirectory, //字典
        tableApi: this.$api.registerAudit.queryRegisterEntPage, //列表查询
        getAuditDetail: this.$api.registerAudit.getAuditDetail, //查询审核详情
        getCertUserInfo: this.$api.registerAudit.getCertUserInfo, //查询待发证用户信息
        certKey: this.$api.registerAudit.makeCertKey, //制key
        submitEntIssuedCert: this.$api.registerAudit.submitEntIssuedCert, //发证完成
      },
      directory: {},
      searchForm: {
        nameLike: "", //企业名称
        applyDatetimeStart: "", //注册申请日期开始
        applyDatetimeEnd: "", //注册申请日期结束
        entType: "", //平台客户类型
        serialNoLike: "", //申请流水号
        registerState: "", //企业注册状态
      },
      platFormAuditEntTypeList: [],
      registerStateList: [],
    };
  },
  methods: {
    //字典
    getDirectory() {
      this.zjControl.getDirectory().then((res) => {
        res.data.platFormEntStateListCheList = JSON.parse(
          JSON.stringify(res.data.platFormEntStateList)
            .replace(/code/g, "key")
            .replace(/desc/g, "label")
        );
        console.log(res.data.platFormEntStateListCheList);
        this.directory = res.data;
        this.getEntTypeList(this.directory.platFormAuditEntTypeList || []);
        this.getRegisterStateList(this.directory.registerStateList || []);
      });
    },
    // 平台客户类型
    getEntTypeList(data) {
      data.forEach((item) => {
        this.platFormAuditEntTypeList.push(item);
      });
    },
    // 企业注册状态
    getRegisterStateList(data) {
      data.forEach((item, index) => {
        if (index !== 0 && index !== 1) {
          //2-待平台初审 3-待平台复审 4-待发证 5-注册拒绝 6-平台拒绝
          this.registerStateList.push(item);
        }
        console.log(this.registerStateList);
      });
    },
    //发证
    certificate(row) {
      if (typeof row === "object") {
        this.$refs.certificate.row = Object.assign({}, row);
        this.$refs.certificate.show = true;
      } else if (typeof row === "boolean") {
        this.search(false);
      }
    },
  },
  created() {
    this.getDirectory();
    // this.getApi();
  },
};
</script>
<style scoped lang="less">
</style>
