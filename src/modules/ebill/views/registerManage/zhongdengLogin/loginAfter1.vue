<template>
    <zj-content-container>
        <zj-content-block>
            <zj-content-block>
                <el-form label-width="200px" class="zj-m-t-20">
                    <zj-content-block>
                        <zj-header title="基本信息" />
                        <el-row>
                            <el-form-item label="受让人：">{{ this.pawneeInfo.corporationName }}</el-form-item>
                            <el-form-item label="交易业务类型：">{{ this.pawneeInfo.pawneeType }}</el-form-item>
                            <el-form-item label="填表人归档号：">
                                <el-input type="text" v-model="pawneeInfo.personFillArchiveNo" name="loginName" />

                            </el-form-item>
                            <!-- <el-form-item label="登记期限（月）：">{{ this.pawneeInfo.regTimeLimit }}</el-form-item> -->
                            <el-form-item label="登记期限（月）：">
                                <!-- <zj-number-input v-model="pawneeInfo.regTimeLimit" :step="10" :min="0" /> -->
                                <el-input-number v-model="pawneeInfo.regTimeLimit" @change="handleChange" :min="1"
                                    :max="24" size="small"></el-input-number>
                            </el-form-item>
                            <el-form-item label="登记到期日：">{{ date(this.pawneeInfo.regTimeLimitDate) }}</el-form-item>
                        </el-row>
                    </zj-content-block>
                    <zj-content-block>
                        <zj-button class="back" @click="getqymsg()">企业信息获取</zj-button>
                        <zj-header title="出让人信息" />
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="debtorInfoList" :pager="false">
                            <zj-table-column field="debtorName" title="出让人" />
                            <zj-table-column field="debtorType" title="出让人类型" :formatter="
                                (obj) => typeMap(dictionary.debtorType, obj.cellValue)
                            " />
                            <zj-table-column field="organizationCode" title="统一社会信用代码" />
                            <zj-table-column field="corporationName" title="法定代表人" />
                            <zj-table-column field="industryCode" title="所属行业" :formatter="
                                (obj) => typeMap(dictionary.industryCode, obj.cellValue)
                            " />
                            <zj-table-column field="scale" title="企业规模" :formatter="
                                (obj) => typeMap(dictionary.entScale, obj.cellValue)
                            " />
                            <zj-table-column field="debtorAddress" title="住所详情" />
                            <zj-table-column title="操作">
                                <template v-slot="{ row, rowIndex }">
                                    <zj-button type="text" @click="dialog(row, rowIndex)">修改</zj-button>
                                </template>
                            </zj-table-column>
                        </zj-table>
                    </zj-content-block>
                    <zj-content-block>
                        <zj-header title="转让财产信息" />
                        <!-- <zj-header title="合同信息" /> -->
                        <h1>合同信息</h1>
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="contractInfo" :pager="false">
                            <zj-table-column field="agreementNo" title="融资合同号码" />
                            <zj-table-column field="agreementName" title="融资合同币种" />
                            <zj-table-column field="agreementStartDate" title="融资合同金额" />
                            <zj-table-column field="agreementEstimateEndDate" title="转让财产币种" />
                            <zj-table-column field="agreementNumber" title="转让财产价值" />
                            <zj-table-column title="操作">
                                <template v-slot="{ row, rowIndex }">
                                    <zj-button type="text" @click="dialog1(row, rowIndex)">修改</zj-button>
                                </template>
                            </zj-table-column>
                        </zj-table>
                        <h1>转让财产描述信息</h1>
                        <strong>转让财产描述</strong>
                        <div class="ipt">
                            <el-input type="textarea" v-model="this.collateralDesc" :rows="8" placeholder="请输入" />
                        </div>
                        <!-- <el-input type="textarea" :rows="3" :autosize="{ mixRows: 5, maxRows: 5 }" placeholder="请输入" /> -->
                        <strong>转让财产附件</strong>
                        <br>

                        <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :autoUpload="true"
                            accept=".pdf,.jpg,.zip,.bmp,.gif,.jpeg,.png,.rar,.ppt,.word,.excel"
                            :onChange="handleFileChange">
                            <zj-button slot="trigger" type="text">上传资料</zj-button>
                        </zj-upload>
                        <p v-show="this.fileShow">
                            {{ filemsg.name }} <span @click="deletefile()">x</span>
                        </p>



                        <div class="zz"></div>
                    </zj-content-block>

                </el-form>
            </zj-content-block>

        </zj-content-block>
        <zj-content-footer>
            <zj-button class="back" @click="back()">返回</zj-button>
            <zj-button class="back" @click="next()">下一步</zj-button>
        </zj-content-footer>
        <!-- 弹框 -->
        <changeDialog ref="changeDialog" :dictionary="this.dictionary"></changeDialog>
        <changeDialog1 ref="changeDialog1"></changeDialog1>
    </zj-content-container>
</template>

<script>
import changeDialog from "../components/changeDialog.vue";
import changeDialog1 from "../components/changeDialog1.vue";
export default {
    name: "toDoDetail",
    components: {
        changeDialog,
        changeDialog1,
    },
    data() {
        return {
            form: {},
            show1: false,
            show2: false,
            dictionary: {},
            zjControl: {
                detailszd: this.$api.zhongdengManage.detailszd,//中登登记详情
                submitZd: this.$api.zhongdengManage.submitZd,//提交登记
                tianyancha: this.$api.zhongdengManage.tianyancha,//天眼查企业信息
                getDictionary: this.$api.zhongdengManage.getDictionary,//数据字典
                submitDetil: this.$api.zhongdengManage.submitDetil,//上传附件
                deleteAttach: this.$api.zhongdengManage.deleteAttach,//删除附件
                registerDate: this.$api.zhongdengManage.registerDate,//计算登记日期
            },
            debtorInfoList: [
                {
                    address: "",
                    city: "",
                    corporationName: "法定代表人",//法定代表人
                    debtorAddress: "住所详情",//住所详情
                    debtorId: "",
                    debtorName: "出让人",//出让人
                    debtorType: "出让人类型",//出让人类型
                    industryCode: "所属行业",//所属行业
                    industryRegistrationCode: "",
                    nationality: "",
                    organizationCode: "统一社会信用编码",//统一社会信用编码
                    province: "",
                    scale: "企业规模",//企业规模
                },
                {
                    address: "",
                    city: "",
                    corporationName: "法定代表人1",//法定代表人
                    debtorAddress: "住所详情1",//住所详情
                    debtorId: "",
                    debtorName: "出让人1",//出让人
                    debtorType: "出让人类型1",//出让人类型
                    industryCode: "所属行业1",//所属行业
                    industryRegistrationCode: "",
                    nationality: "",
                    organizationCode: "统一社会信用编码1",//统一社会信用编码
                    province: "",
                    scale: "企业规模1",//企业规模
                }
            ],//出让人信息列表
            contractInfo: [],//合同信息
            collateralDesc: "",//财产描述
            // idList: this.row.idList,
            idList: [],
            pawneeInfo: {},//受让人信息集合（基本信息）
            idListDetail: [],
            row: {},
            filemsg: {},
            fileres: {},
            fileShow: false,
            uploadFileId: "",
        }
    },
    created() {
        this.getApi()
        this.getRow()
        console.log(this.row, "传来的row");

        this.idList = this.row.idList,
            this.getDictionary()
        this.getDetail()
    },
    methods: {
        handleChange(value) {
            console.log(value);
            let params = {
                regTimeLimit: value,
                idList: this.idListDetail
            }
            this.zjControl.registerDate(params).then(res => {
                console.log(res.data);
                this.pawneeInfo.regTimeLimitDate = res.data.expireDate
            })
        },
        back() {
            this.goParent('zhongdengManage')
            // this.goParent('zhongdengManage', false)
        },
        downs(row) {
            console.log(row);
            let params = {
                fileId: row.fileId,
                fileName: row.fileName
            }
            this.$api.baseCommon.downloadFile(params).then((res) => {
            });
        },
        deletefile() {
            this.fileShow = false
            let params = {
                uploadFileId: this.uploadFileId,
                validateFlownNo: this.row.checkLogin.validateFlownNo,
                idList: this.idListDetail
            }
            this.zjControl.deleteAttach(params).then(res => {
                this.uploadFileId = ""
            })
        },
        handleFileUpload({ file }) {
            let formData = new FormData();
            formData.append("fileOB", file);
            formData.append("idList", this.idListDetail);
            formData.append("validateFlownNo ", this.row.checkLogin.validateFlownNo);
            formData.append("uploadFileId ", this.uploadFileId);
            console.log(formData);
            this.zjControl.submitDetil(formData).then((res) => {
                this.uploadFileId = res.data.uploadFileId
                console.log(res.data);
            });
        },
        handleFileChange(file) {
            this.filemsg = file
            this.fileShow = true
            console.log(this.filemsg);
        },
        getqymsg() {
            let params = {
                idList: this.idListDetail,
            }
            console.log(params);
            this.zjControl.tianyancha(params).then(res => {
                this.debtorInfoList = res.data.debtorInfoList
            })
        },
        dialog(row) {
            let idList = this.idListDetail
            this.$refs.changeDialog.open(row, idList)
        },
        dialog1(row) {
            let idList = this.idListDetail
            this.$refs.changeDialog1.open(row, idList)
        },
        next() {
            let row = {
                pawneeInfo: this.pawneeInfo,
                idList: this.idListDetail,
                collateralDesc: this.collateralDesc,
                contractInfo: this.contractInfo,
                debtorInfoList: this.debtorInfoList,
                initRegisterToken1: this.row.checkLogin.initRegisterToken1,
                validateFlownNo: this.row.checkLogin.validateFlownNo,
                filemsg: this.filemsg
            }
            this.goChild('zhongdengManagexq2', row)
        },
        getDictionary() {
            this.zjControl.getDictionary().then(res => {
                this.dictionary = res.data
            })
        },
        getDetail() {
            let params = {
                bizType: this.row.bizType,
                idList: this.row.idlist,
            }
            console.log(params, "详情接口的参数");
            this.zjControl.detailszd(params).then(res => {
                this.debtorInfoList = res.data.debtorInfoList
                this.fileAttach = res.data.fileAttach
                this.collateralDesc = res.data.collateralDesc
                this.idListDetail = res.data.idList
                this.pawneeInfo = res.data.pawneeInfo
            })
        },
    },
}
</script>

<style scoped lang="less">
h1 {
    margin-bottom: 20px
}

.zz {
    width: 10px;
    height: 10px;
    margin-top: 200px;
}

.ipt {
    width: 80vw;
    height: 200px;
}

.fileBox {
    width: 120px;
    height: 40px;
    border: 1px solid black;
    // background-color: black;
}

/deep/.el-input-number__increase {
    left: 192px;
    width: 26px;
    height: 26px;
    top: 3px;
    // z-index:0
}

/deep/.el-input-number__decrease {
    // left: 180px;
    // z-index:0
    width: 26px;
    height: 26px;
    top: 3px;
}
</style>