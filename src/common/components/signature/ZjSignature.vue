<template>
    <div class="eleSign" ref="eleSign" id="eleSign">
        <el-button @click="handleSign">{{btnText}}</el-button>
    </div>
</template>
<script>
    import $ from 'jquery'
    import CryptoJS from 'crypto-js'
    import myBrowser from './browser'
    String.prototype.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)}/g, function (m, i) {
            return args[i]
        })
    }

    export default {
        name: "eleSign",
        props:{
          btnText:{type:String,default:'复核确认'},
          idList:Array,
          rowList:Array
        },
        watch:{
            idList(newArr){
                this.singleFlag === newArr && newArr.length <= 1
                this.paramsData.param.ids = newArr.join(',')
            },
            rowList(newArr){
                this.paramsData.param.payables = newArr
            }
        },
        data() {
            return {
                serialNum:'‎1040511489', //证书序列号
                CryptoAgent: null, //电子签章对象
                $certInfos: '', //证书信息
                $hasInitCfcaCertEnv: false, //全局初始化的证书标识符
                keyVal: '', //加密码（输入了密码后返回的）
                plainText: '',//接口送过去的参数（签署协议）
                singleFlag:true, //true单选，false多选
                paramsData: { //接口参数
                    param: {
                        flag:'1',
                        ids:'',
                        payables:[]
                    }
                }
            }
        },
        created() {

        },
        methods: {
            //初始化环境
            init() {
                try {
                    var eDiv = document.createElement('div');
                    eDiv.style.height = 0;
                    eDiv.style.width = 0;
                    if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
                        if (window.navigator.cpuClass == "x86") {
                            eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Paperless.x86.cab\" classid=\"clsid:B64B695B-348D-400D-8D58-9AAB1DA5851A\" ></object>";
                        } else {
                            eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Paperless.x64.cab\" classid=\"clsid:8BF7E683-630E-4B59-9E61-C996B671EBDF\" ></object>";
                        }
                    } else {
                        eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.Paperless.x86\" style=\"height: 0px; width: 0px\">";
                    }
                    document.getElementById('eleSign').appendChild(eDiv);
                    this.CryptoAgent = document.getElementById('CryptoAgent');

                    try {
                        this.CryptoAgent.GetLastErrorDesc();
                    } catch (e) {
                        console.log('非IE浏览器初始化环境失败')
                    }
                } catch (e) {
                    if (typeof e == 'string') {
                        throw e;
                    } else if (e.name == 'TypeError') {
                      this.$messageBox({
                        type:'confirm',
                        title:`提示`,
                        content:`请下载、安装证书控件，并重启浏览器!`,
                        showCancelButton:true,
                        messageResolve:()=>{
                          this.download({
                            url: '' + "/resources/ocx/CryptoKit.Paperless.exe"
                          });
                        },
                        messageReject:() => {
                          console.error('取消')
                        }
                      })

                        return false
                    } else {
                        var message = this.CryptoAgent.CFCA_GetLastErrorDesc();
                        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
                    }
                }
                return true
            },
            selectCert(subjectDNFilter, issuerDNFilter, serialNumFilter, cspName) {
                try {
                    var selectedCert = this.CryptoAgent.SelectCertificate(subjectDNFilter, issuerDNFilter, serialNumFilter, cspName);
                    if (!selectedCert) {
                        throw this.CryptoAgent.GetLastErrorDesc();
                    }
                    return selectedCert;
                } catch (e) {
                    if (typeof e == 'string') {
                        throw e;
                    } else {
                        var message = this.CryptoAgent.GetLastErrorDesc();
                        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
                    }
                }
            },
            // SubjectDN, SubjectCN, SerialNumber, CSPName, CertType, IssuerDN, CertContent
            // getCertInfo(infoType) {
            //     try {
            //         var info = this.CryptoAgent.GetSignCertInfo(infoType);
            //         if (!info) {
            //             throw this.CryptoAgent.GetLastErrorDesc();
            //         }
            //         return info;
            //     } catch (e) {
            //         if (typeof e == 'string') {
            //             throw e;
            //         } else {
            //             var message = this.CryptoAgent.GetLastErrorDesc();
            //             throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
            //         }
            //     }
            // },
            // sign(original) {
            //     try {
            //         var signature = this.CryptoAgent.SignMsgPKCS7(original, 'SHA-1', false);
            //         if (!signature) {
            //             throw this.CryptoAgent.GetLastErrorDesc();
            //         }
            //         return signature;
            //     } catch (e) {
            //         if (typeof e == 'string') {
            //             throw e;
            //         } else {
            //             var message = this.CryptoAgent.GetLastErrorDesc();
            //             throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
            //         }
            //     }
            // },
            sealSign(original) {
                try {
                    var signature = this.CryptoAgent.SignHashMsgPKCS7Detached(original, 'SHA-256');
                    if (!signature) {
                        throw this.CryptoAgent.GetLastErrorDesc();
                    }
                    return signature;
                } catch (e) {
                    if (typeof e == 'string') {
                        throw e;
                    } else {
                        var message = this.CryptoAgent.GetLastErrorDesc();
                        throw message.indexOf('0x00000000') == -1 ? message : (e.number + '\n' + e.message);
                    }
                }
            },
            // 文件下载
            download: function (cfg) {
                var frameId ="icitic-download-iframe" + $.now(),iframeJq,iframe,form,interval,intervalGap = 500;
                function valRsp(val) {
                    if(val === undefined){
                        //取值
                        if (iframe.contentWindow) {
                            //非IE
                            val = $(iframe.contentWindow.document.body).html();
                        } else if (iframe.contentDocument) {
                            //IE
                            val = $(iframe.contentDocument.document.body).html();
                        }
                        if(val){
                            try{
                                return $.parseJSON(val);
                            }catch(e){
                                return {
                                    success : false,
                                    root : "下载时出现错误..."
                                }
                            }
                        }else{
                            return {};
                        }
                    }else{
                        //赋值
                        if (iframe.contentWindow) {
                            //非IE
                            $(iframe.contentWindow.document.body).html(val);
                        } else if (iframe.contentDocument) {
                            //IE
                            $(iframe.contentDocument.document.body).html(val);
                        }
                    }
                }

                if(!iframeJq || !iframeJq.length){
                    console.error('String:', String)
                    iframeJq = $((new String).format("<iframe id='{0}' name='{0}' style='display: none;'/>",frameId)).appendTo(document.body);
                    iframe = iframeJq.get(0);
                }
                if(!form || !form.length){
                    console.error('String2:', String)
                    form = $((new String).format("<form action='#' target='{0}' method='POST' style='display: none;'></form>",frameId)).appendTo(document.body);
                }
                valRsp("");
                form.attr("action",cfg.url).empty();
                cfg.data = cfg.data || {};
                //解决CSRF问题添加的随机数 2016-12-5
                cfg.data.random = Math.random()
                $.each(cfg.data,function(i,n){
                    $("<input/>").appendTo(form).attr("name",i).val(n);
                });
                form.get(0).submit();
                interval = setInterval(function () {
                    var rsp;
                    try {
                        rsp = valRsp();
                    } catch (e) {
                        return;
                    }
                    if(rsp) {
                        if(cfg.isstop){
                            clearInterval(interval);
                        } else {
                            if (cfg.success) {
                                cfg.success(cfg);
                            }
                        }
                    }
                },intervalGap);
            },
            // ukey生成协议
            signProtocol () {
                // 获取创建协议信息
                this.$api.baseCommon.getEnterpriseRegister({
                    url: '/createProtocol', // 接口地址
                    data: JSON.stringify(this.paramsData.param),
                    contentType: "application/json",
                }).then(res => {
                    if (res.success) {
                        this.paramsData.param.protoList = res.root;
                        this.paramsData.param.plainText = this.unescapeHtml(this.paramsData.checkPayableSequence);
                        this.paramsData.param.plainTextMd5 = CryptoJS.SHA1(this.plainText).toString();
                        var sealFiles = [];
                        $.each(this.paramsData.param.protoList, function () {
                            sealFiles.push(this);
                        });
                        this.ukeySign({
                            certType: this.paramsData.certType,
                            data: [{
                                plainText: this.paramsData.param.plainTextMd5,
                                sealFiles: sealFiles
                            }],
                            success: function (signResult) {
                                $.extend(this.paramsData.param, signResult[0]);
                                $.each(this.paramsData.param.protoList, function (index, row) {
                                    $.extend(row, signResult[0], {
                                        dataToSign: signResult[0].sealFiles[index].dataToSign
                                    });
                                });
                                this.handleSubmit(signResult);
                            }
                        });
                    } else {
                        // this.$message({showClose: true, message: res.root || '提交失败', type: 'error', duration: 2000})
                        this.$message.error({showClose: true, message: res.root || '提交失败', duration: 2000})
                    }
                })
            },
            _getCertInfo (cb, errorCb, cache) {
                cb = $.isFunction(cb) ? cb : $.noop;
                if (cache && this.$certInfos) {
                    cb(this.$certInfos)
                } else {
                    // 请求数据
                    /*Izejin.request({
                        lock: '正在初始化证书签名环境...',
                        url: Izejin.rootPath + '/work/accmgt/ent-cert/query-cert.json?' + $.now(),
                        success: function (res) {
                            if (res.success) {
                                if ($.isPlainObject(res.root)) {
                                    res.root = [res.root];
                                }
                                $.each(res.root, function () {
                                    this.$certInfos = this;
                                })
                                cb(this.$certInfos);
                            } else {
                                Izejin.log.warn(res.root);
                                errorCb(res.root);
                            }
                        }
                    });

                    this.$api.sys.uploadFile(formData).then(ret => {
                        this.dnFile = ret
                        this.download(
                            '/common/download-file',
                            this.dnFile,
                            'view',
                            'post'
                        ).then(url =>{
                            console.error('url', url)
                            this.visible = true
                            this.viewPath = ret.fileUrl
                            this.viewUrl = url
                        })
                    })*/
                }
            },
            _checkCfca (certInfo, cb) {
                try {
                    if (!this.$hasInitCfcaCertEnv) {
                        this.init();
                        this.$hasInitCfcaCertEnv = true;
                    }
                } catch (e) {
                    return cb({msg: e})
                }
                try {
                    this.selectCert('', '', certInfo.certSerialNumber, '');
                    cb({status: true});
                } catch (e) {
                    return cb({msg: '请插入正确的UKEY。'});
                }
            },
            _sign (data, cb, errorCb) {
                var response = [];
                try {
                    $.each(data, function () {
                        var result = {};
                        result.certType = 2;
                        result.certSerialNumber = this.getCertInfo('SerialNumber');
                        result.signData = this.sign(this.plainText);
                        // 存在需要加盖签章的数据，二次处理
                        if ($.isArray(this.sealFiles)) {
                            result.sealFiles = [];
                            $.each(this.sealFiles, function () {
                                result.sealFiles.push($.extend({}, this, {
                                    dataToSign: this.sealSign(this.dataToSign)
                                }));
                            });
                        }
                        response.push(result);
                    });
                    cb(response);
                } catch (e) {
                    if (/0x800704c7/.test(e)) {
                        errorCb('cancel');
                    } else {
                        // this.$message({ showClose: true, message: '错误', type: 'warning', duration: 2000 });
                        this.$message.warning({ showClose: true, message: '错误', duration: 2000 });
                        errorCb(e);
                    }
                }
            },
            // 调用证书签名
            ukeySign(opt) {
                opt = $.extend({
                    data: [],
                    cache: true,
                    success: $.noop,
                    error: $.noop
                }, opt);
                if ($.isPlainObject(opt.data)) {
                    opt.data = [opt.data];
                }
                this._getCertInfo(function (cfca) {
                    if (cfca) {
                        this._checkCfca(cfca, function (checkResult) {
                            if (checkResult.status) {
                                this._sign(opt.data, opt.success, opt.error);
                            } else {
                                // this.$message({showClose: true, message: checkResult.msg, type: 'warning', duration: 2000})
                                this.$message.warning({showClose: true, message: checkResult.msg, duration: 2000})
                                opt.error(checkResult.msg);
                            }
                        })
                    } else {
                        let msg = '暂未配置证书信息，不能执行此操作！'
                        // this.$message({showClose: true, message: msg, type: 'warning', duration: 2000})
                        this.$message.warning({showClose: true, message: msg, duration: 2000})
                        opt.error(msg);
                    }
                }, opt.error, opt.cache);
            },
            // 反转义特殊字符
            unescapeHtml: function (val) {
                return String(val || '').replace(/&\s*lt;/gm, '<')
                    .replace(/&\s*gt;/gm, '>')
                    .replace(/&quot;/gm, "\"")
                    .replace(/&amp;/gm, '&')
                    .replace(/&rdquo;/gm, '”')
                    .replace(/&ldquo;/gm, '“')
                    .replace(/&#39;/gm, '\'')
                    .replace(/&hellip;/gm, '…');
            },
            // 真正提交(签署)
            handleSubmit (res) {
                this.$emit('protocal',{
                    serialNum:this.serialNum, //证书序列号
                    CryptoAgent: this.CryptoAgent, //电子签章对象
                    $certInfos: this.$certInfos, //证书信息
                    $hasInitCfcaCertEnv: this.$hasInitCfcaCertEnv, //全局初始化的证书标识符
                    keyVal: this.keyVal, //加密码（输入了密码后返回的）
                    plainText: this.plainText,//接口送过去的参数（签署协议）
                    singleFlag:this.singleFlag,
                    paramsData: this.paramsData,
                    res,
                })
            },
            async handleSign () {


                if (myBrowser.indexOf('IE') === -1) {
                    // this.$message({showClose: true, message: '请您使用IE浏览器完成操作', type: 'warning', duration: 2000})
                    this.$message.warning({showClose: true, message: '请您使用IE浏览器完成操作', duration: 2000})
                    return
                }

                //获取证书序列号
                let res = await this.$api.baseCommon.getUserCert()
                this.serialNum = res.serialNo

                try {
                    this.CryptoAgent.SelectCertificate('', '', this.serialNum, '');
                    this.keyVal = this.CryptoAgent.SignHashMsgPKCS7Detached(this.serialNum, 'SHA-256');
                    console.error(this.keyVal)

                    if (this.keyVal) { // ukey生成协议
                        this.signProtocol()
                    }
                } catch (e) {
                    console.error('e:', typeof e)
                    console.error(JSON.stringify(e))
                    console.error('JSON.stringify(e).number:', JSON.parse(JSON.stringify(e)).number)
                    if (JSON.parse(JSON.stringify(e)).number === -1610149887) {
                        // this.$message({showClose: true, message: '是否正确插入了Ukey?', type: 'warning', duration: 2000})
                        this.$message.warning({showClose: true, message: '是否正确插入了Ukey?', duration: 2000})
                    } else if (JSON.parse(JSON.stringify(e)).stack.indexOf('Error') > -1) {
                        console.error('取消输入密码')
                    }
                }
            }
        },
        computed: {

        },
        mounted() {
            this.init()
        }
    }
</script>
<style lang="less">

</style>
