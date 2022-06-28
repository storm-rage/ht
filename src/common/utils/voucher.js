//融单开立凭证 √
function open(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}开立凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.payEntName}</td>
                              <td colspan="1" rowspan="5" class="ta-c">收单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.receiptEntName}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信信用代码</td>
                            <td colspan="2">${item.payBizLicence}</td>
                            <td colspan="1">银行账户户名</td>
                            <td colspan="2">${item.receiptBankAccname}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName}</td>
                            <td colspan="1">开户行</td>
                            <td colspan="2">${item.receiptBankName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">开单日期</td>
                            <td colspan="2">${that.date(item.openDate)}</td>
                            <td colspan="1">银行账号</td>
                            <td colspan="2">${item.receiptBankAccno || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">到期日期</td>
                            <td colspan="2">${that.date(item.expireDate)}</td>
                            <td colspan="1">联行号</td>
                            <td colspan="2">${item.receiptBankNo || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.ebillAmtUpper || ''}</div>
                                <div style="float:right">（小写） ¥${item.ebillAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">开单说明</td>
                              <td colspan="6" style="word-wrap: break-word;word-break: break-all;">${item.remark || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="8">
                                我司同意按照《<label class="primary">开单确认书</label>》的约定，到期无条件向
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}最终持有人兑付
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}项下全部应付款项
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处：${imgs}
                              </td>
                          </tr>
                      </table>
                      <div>
                            <div style="display:inline-block;width: 25%">开单经办人：${item.handler || ''}</div>
                            <div style="display:inline-block;width: 25%">开单复核人：${item.reviewer || ''}</div>
                      </div>
                    </div>`
}
//融单持有凭证 √
function hold(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}持有凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.payEntName}</td>
                              <td colspan="1" rowspan="5" class="ta-c">收单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.receiptEntName}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信信用代码</td>
                            <td colspan="2">${item.payBizLicence}</td>
                            <td colspan="1">银行账户户名</td>
                            <td colspan="2">${item.receiptBankAccname}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName}</td>
                            <td colspan="1">开户行</td>
                            <td colspan="2">${item.receiptBankName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">开单日期</td>
                            <td colspan="2">${that.date(item.openDate)}</td>
                            <td colspan="1">银行账号</td>
                            <td colspan="2">${item.receiptBankAccno || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">到期日期</td>
                            <td colspan="2">${that.date(item.expireDate)}</td>
                            <td colspan="1">联行号</td>
                            <td colspan="2">${item.receiptBankNo || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.ebillAmtUpper || ''}</div>
                                <div style="float:right">（小写） ¥${item.ebillAmt ? item.ebillAmt : '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">开单说明</td>
                              <td colspan="6" style="word-wrap: break-word;word-break: break-all;">${item.remark || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="8">
                                我司同意按照《<label class="primary">开单确认书</label>》的约定，到期无条件向
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}最终持有人兑付
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}项下全部应付款项
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处：${imgs}
                              </td>
                          </tr>
                      </table>
                      <div>
                            签收人：${item.signer || ''}
                      </div>
                    </div>`
}
//余额变革凭证
function alter(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo || ''}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">余额变更凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode || ''}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.payEntName || ''}</td>
                              <td colspan="1" rowspan="5" class="ta-c">持有企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.receiptEntName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.payBizLicence || ''}</td>
                            <td colspan="1">银行账户户名</td>
                            <td colspan="2">${item.receiptBankAccname || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName || ''}</td>
                            <td colspan="1">开户行</td>
                            <td colspan="2">${item.receiptBankName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">开单日期</td>
                            <td colspan="2">${that.date(item.openDate)}</td>
                            <td colspan="1">银行账号</td>
                            <td colspan="2">${item.receiptBankAccno || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">到期日期</td>
                            <td colspan="2">${that.date(item.expireDate)}</td>
                            <td colspan="1">联行号</td>
                            <td colspan="2">${item.receiptBankNo || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="2">变更前${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.oldEbillAmtUpper || ''}</div>
                                <div style="float:right">（小写）¥${item.oldEbillAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">变更后${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.ebillAmtUpper}</div>
                                <div style="float:right">（小写） ¥${item.ebillAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">开单说明</td>
                              <td colspan="6" style="word-wrap: break-word;word-break: break-all;">
                                ${item.remark || ''}
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8">
                                我司同意按照《<label class="primary">开单确认书</label>》的约定，到期无条件向
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}最终持有人兑付
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}项下全部应付款项
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处:${imgs}
                              </td>
                          </tr>
                      </table>
                    </div>`
}
//融单转让凭证 √
function transfer(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}转让凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">转让${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.signCode}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                          <tr>
                              <td colspan="2">上级${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.payEntName}</td>
                              <td colspan="1" rowspan="2" class="ta-c">转出企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.fromEntName}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.payBizLicence}</td>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.fromBizLicence}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName}</td>
                            <td colspan="1" rowspan="2">签收企业</td>
                            <td colspan="1">企业名称</td>
                            <td colspan="2">${item.toEntName}</td>
                          </tr>
                          <tr>
                            <td colspan="2">到期日期</td>
                            <td colspan="2">${that.date(item.expireDate)}</td>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.toBizLicence}</td>
                          </tr>
                          <tr>
                            <td colspan="2">转让签收日期</td>
                            <td colspan="6">${that.date(item.signDate)}</td>
                          </tr>
                          <tr>
                              <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.ebillAmtUpper}</div>
                                <div style="float:right">（小写） ¥${item.ebillAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8">
                                我司同意按照《<label class="primary">开单确认书</label>》的约定，到期无条件向
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}最终持有人兑付
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}项下全部应付款项
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">转让说明</td>
                              <td colspan="6" style="word-wrap: break-word;word-break: break-all;">${item.remark || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处:${imgs}
                              </td>
                          </tr>
                      </table>
                      <div>
                        <div style="display:inline-block;width: 25%">转出经办人：${item.handler || ''}</div>
                        <div style="display:inline-block;width: 25%">转出复核人：${item.reviewer || ''}</div>
                        <div style="display:inline-block;width: 25%">签收人：${item.signer || ''}</div>
                      </div>
                    </div>`
}
//融单作废凭证 √
function obsolete(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}作废凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.payEntName || ''}</td>
                              <td colspan="1" rowspan="5" class="ta-c">收单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.receiptEntName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信信用代码</td>
                            <td colspan="2">${item.writerBizLicence || ''}</td>
                            <td colspan="1">银行账户户名</td>
                            <td colspan="2">${item.receiptAcctName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName || ''}</td>
                            <td colspan="1">开户行</td>
                            <td colspan="2">${item.receiptBankName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">开单日期</td>
                            <td colspan="2">${that.date(item.openDate)}</td>
                            <td colspan="1">银行账号</td>
                            <td colspan="2">${item.receiptAcctNo || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">到期日期</td>
                            <td colspan="2">${that.date(item.expireDate)}</td>
                            <td colspan="1">联行号</td>
                            <td colspan="2">${item.receiptBankNo || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.ebillAmtUp || ''}</div>
                                <div style="float:right">（小写）¥${item.ebillAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="2">作废日期</td>
                              <td colspan="6">${that.date(item.invalidDate)}</td>
                          </tr>
                          <tr>
                              <td colspan="2">备注</td>
                              <td colspan="6">${item.rejectReason || ''}</td>
                          </tr>
                          <tr>
                              <td colspan="8">
                                我司同意按照《<label class="primary">开单确认书</label>》的约定，到期无条件向
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}最终持有人兑付
                                ${that.$i18n.messages[that.$i18n.locale].lang.financingName}项下全部应付款项
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处：${imgs}
                              </td>
                          </tr>
                      </table>
                      <div>
                            <div style="display:inline-block;width: 25%">经办人：${item.applyUser || ''}</div>
                            <div style="display:inline-block;width: 25%">复核人：${item.reviewUser || ''}</div>
                      </div>
                    </div>`
}
//融单融资凭证 √
function finan(item,that) {
  let title = that.$i18n.messages[that.$i18n.locale].lang.financingName + '融资凭证'
  let apply = '融资申请人'
  let review = '融资复核人'
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                        <table cellspacing="0" cellpadding="0" style="width: 100%;">
                            <tr style="width: 100%">
                                <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                            </tr>
                            <tr style="width: 100%">
                                <td colspan="2" align="center" style="font-weight:bold;">${title}</td>
                            </tr>
                            <tr style="width: 100%">
                                <td style="text-align: left;width: 50%">融资${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.signCode}</td>
                                <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                            </tr>
                            <tr>
                                <td colspan="2">上级${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                            </tr>
                        </table>

                        <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                            <tr>
                                <td colspan="2">资金方企业名称</td>
                                <td colspan="6">${item.toEntName}</td>
                            </tr>
                            <tr>
                                <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                                <td colspan="1">企业名称</td>
                                <td colspan="2">${item.writerName}</td>
                                <td colspan="1" rowspan="5" class="ta-c">融资企业</td>
                                <td colspan="1">企业名称</td>
                                <td colspan="2">${item.fromEntName}</td>
                            </tr>
                            <tr>
                              <td colspan="1">统一社会信信用代码</td>
                              <td colspan="2">${item.writerBizLicence}</td>
                              <td colspan="1">银行账户户名</td>
                              <td colspan="2">${item.receiptAcctName}</td>
                            </tr>
                            <tr>
                              <td colspan="1">业务方</td>
                              <td colspan="2">${item.createEntName}</td>
                              <td colspan="1">开户行</td>
                              <td colspan="2">${item.receiptBankName || ''}</td>
                            </tr>
                            <tr>
                              <td colspan="2">开单日期</td>
                              <td colspan="2">${that.date(item.openDate)}</td>
                              <td colspan="1">银行账号</td>
                              <td colspan="2">${item.receiptAcctNo || ''}</td>
                            </tr>
                            <tr>
                              <td colspan="2">到期日期</td>
                              <td colspan="2">${that.date(item.expireDate)}</td>
                              <td colspan="1">联行号</td>
                              <td colspan="2">${item.receiptBankNo || ''}</td>
                            </tr>
                            <tr>
                                <td colspan="2">融资金额</td>
                                <td colspan="6">
                                  <div style="float:left">（大写）${item.tranAmtUp}</div>
                                  <div style="float:right">（小写） ¥${item.tranAmt || '0.00'}元</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">融资放款金额</td>
                                <td colspan="6">
                                  <div style="float:left">（大写）${item.actualAmtUp}</div>
                                  <div style="float:right">（小写） ¥${item.actualAmt || '0.00'}元</div>
                                </td>
                            </tr>
                            <tr>
                              <td colspan="2">融资放款日期</td>
                              <td colspan="2">${that.date(item.loanDate)}</td>
                              <td colspan="2">融资天数</td>
                              <td colspan="2">${item.finaningDay}</td>
                            </tr>
                            <tr>
                                <td colspan="2">利率</td>
                                <td colspan="6">
                                    <span>融资利率：${that.rate(item.interestRate)}&nbsp;&nbsp;</span>
                                    <span>保理手续费率：${that.rate(item.blFeeRate)}&nbsp;&nbsp;</span>
                                    <span>平台服务费率：${that.rate(item.plFeeRate)}&nbsp;&nbsp;</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">利息</td>
                                <td colspan="6">
                                    <span>利息金额：${that.money(item.interestAmt)}&nbsp;&nbsp;</span>
                                    <span>保理手续费金额：${that.money(item.blFeeAmt)}&nbsp;&nbsp;</span>
                                    <span>平台服务费金额：${that.money(item.plFeeAmt)}&nbsp;&nbsp;</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="8" align="left" style="vertical-align: top;padding: 5px 0">
                                  签章处：${imgs}
                                </td>
                            </tr>
                        </table>
                        <div>
                          <div style="display:inline-block;width: 33%">${apply}：${item.applyUser || ''}</div>
                          <div style="display:inline-block;width: 33%">${review}：${item.reviewUser || ''}</div>
                        </div>
                      </div>`
}
//融资放款凭证 √
function loan(item,that) {
  let title = '融资放款凭证'
  let apply = '初审员'
  let review = '终审员'
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                        <table cellspacing="0" cellpadding="0" style="width: 100%;">
                            <tr style="width: 100%">
                                <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                            </tr>
                            <tr style="width: 100%">
                                <td colspan="2" align="center" style="font-weight:bold;">${title}</td>
                            </tr>
                            <tr style="width: 100%">
                                <td style="text-align: left;width: 50%">融资${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.signCode}</td>
                                <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                            </tr>
                            <tr>
                                <td colspan="2">上级${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                            </tr>
                        </table>

                        <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                            <tr>
                                <td colspan="2">资金方企业名称</td>
                                <td colspan="6">${item.toEntName}</td>
                            </tr>
                            <tr>
                                <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                                <td colspan="1">企业名称</td>
                                <td colspan="2">${item.writerName}</td>
                                <td colspan="1" rowspan="5" class="ta-c">融资企业</td>
                                <td colspan="1">企业名称</td>
                                <td colspan="2">${item.fromEntName}</td>
                            </tr>
                            <tr>
                              <td colspan="1">统一社会信信用代码</td>
                              <td colspan="2">${item.writerBizLicence}</td>
                              <td colspan="1">银行账户户名</td>
                              <td colspan="2">${item.receiptAcctName}</td>
                            </tr>
                            <tr>
                              <td colspan="1">业务方</td>
                              <td colspan="2">${item.createEntName}</td>
                              <td colspan="1">开户行</td>
                              <td colspan="2">${item.receiptBankName || ''}</td>
                            </tr>
                            <tr>
                              <td colspan="2">开单日期</td>
                              <td colspan="2">${that.date(item.openDate)}</td>
                              <td colspan="1">银行账号</td>
                              <td colspan="2">${item.receiptAcctNo || ''}</td>
                            </tr>
                            <tr>
                              <td colspan="2">到期日期</td>
                              <td colspan="2">${that.date(item.expireDate)}</td>
                              <td colspan="1">联行号</td>
                              <td colspan="2">${item.receiptBankNo || ''}</td>
                            </tr>
                            <tr>
                                <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                                <td colspan="6">
                                  <div style="float:left">（大写）${item.tranAmtUp}</div>
                                  <div style="float:right">（小写） ¥${item.tranAmt || '0.00'}元</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">融资放款金额</td>
                                <td colspan="6">
                                  <div style="float:left">（大写）${item.actualAmtUp}</div>
                                  <div style="float:right">（小写） ¥${item.actualAmt || '0.00'}元</div>
                                </td>
                            </tr>
                            <tr>
                              <td colspan="2">融资放款日期</td>
                              <td colspan="2">${that.date(item.loanDate)}</td>
                              <td colspan="2">融资天数</td>
                              <td colspan="2">${item.finaningDay}</td>
                            </tr>
                            <tr>
                                <td colspan="2">利率</td>
                                <td colspan="6">
                                    <span>融资利率：${that.rate(item.interestRate)}&nbsp;&nbsp;</span>
                                    <span>保理手续费率：${that.rate(item.blFeeRate)}&nbsp;&nbsp;</span>
                                    <span>平台服务费率：${that.rate(item.plFeeRate)}&nbsp;&nbsp;</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">利息</td>
                                <td colspan="6">
                                    <span>利息金额：${that.money(item.interestAmt)}&nbsp;&nbsp;</span>
                                    <span>保理手续费金额：${that.money(item.blFeeAmt)}&nbsp;&nbsp;</span>
                                    <span>平台服务费金额：${that.money(item.plFeeAmt)}&nbsp;&nbsp;</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="8" align="left" style="vertical-align: top;padding: 5px 0">
                                  签章处：${imgs}
                                </td>
                            </tr>
                        </table>
                        <div>
                          <div style="display:inline-block;width: 33%">${apply}：${item.applyUser || ''}</div>
                          <div style="display:inline-block;width: 33%">${review}：${item.reviewUser || ''}</div>
                        </div>
                      </div>`
}
//融单到期凭证 √
function expire(item,that) {
  let imgs = '<div style="display: inline-block">'
  if(item.sealPngList && item.sealPngList.length){
    item.sealPngList.map((subItem, key) => {
      imgs += '<img src=' + subItem + '/>'
      if (key === item.sealPngList.length-1) {
        imgs += '</div>'
      }
    })
  }else{
    imgs = ''
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号：${item.ebillCode}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="openTable" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                              <td colspan="1" rowspan="3" class="ta-c">开单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.writerName}</td>
                              <td colspan="1" rowspan="2" class="ta-c">原始持单企业</td>
                              <td colspan="1">企业名称</td>
                              <td colspan="2">${item.receiptEntName}</td>
                          </tr>
                          <tr>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.writerBizLicence}</td>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.receiptBizLicence}</td>
                          </tr>
                          <tr>
                            <td colspan="1">业务方</td>
                            <td colspan="2">${item.createEntName}</td>
                            <td colspan="1" rowspan="2">最终持有企业</td>
                            <td colspan="1">企业名称</td>
                            <td colspan="2">${item.holderName}</td>
                          </tr>
                          <tr>
                            <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}持有日期</td>
                            <td colspan="2">${that.date(item.holderDate)}</td>
                            <td colspan="1">统一社会信用代码</td>
                            <td colspan="2">${item.holderBizLicence}</td>
                          </tr>
                          <tr>
                            <td colspan="2" rowspan="4">最终收款信息</td>
                            <td colspan="2">收款银行账户户名</td>
                            <td colspan="4">${item.bankAccname}</td>
                          </tr>
                          <tr>
                            <td colspan="2">开户行</td>
                            <td colspan="4">${item.bankName || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">银行账号</td>
                            <td colspan="4">${item.bankAccno || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">联行号</td>
                            <td colspan="4">${item.bankNo || ''}</td>
                          </tr>
                          <tr>
                            <td colspan="2">${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                            <td colspan="2">${that.money(item.ebillAmt)}</td>
                            <td colspan="2">返还/扣除金额</td>
                            <td colspan="2">${that.money(item.returnAmt)}</td>
                          </tr>
                          <tr>
                              <td colspan="2">最终付款金额</td>
                              <td colspan="6">
                                <div style="float:left">（大写）${item.payAmtUp}</div>
                                <div style="float:right">（小写） ¥${item.payAmt || '0.00'}元</div>
                              </td>
                          </tr>
                          <tr>
                              <td colspan="8" align="left">
                                签章处:${imgs}
                              </td>
                          </tr>
                      </table>
                      <div>
                        注： 最终付款金额&nbsp; = &nbsp;${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额 &nbsp; + &nbsp;返还/扣除金额
                      </div>
                    </div>`
}
//融单到期清算凭证 √
function expire2(item,that) {
  let trList = ''
  if(item.innerVoucherModelList && item.innerVoucherModelList.length){
    item.innerVoucherModelList.map(citem => {
      let tr = `
        <tr>
            <td style="word-break: break-all">${citem.ebillCode || ''}</td>
            <td style="word-break: break-all">${citem.payEntName || ''}</td>
            <td style="word-break: break-all">${citem.createEntName || ''}</td>
            <td style="word-break: break-all">${citem.receiptEntName || ''}</td>
            <td style="word-break: break-all">${citem.holderName || ''}</td>
            <td style="word-break: break-all">${that.money(citem.ebillAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.returnAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.payAmt)}</td>
            <td style="word-break: break-all">${citem.bankAccname || ''}</td>
            <td style="word-break: break-all">${citem.bankName || ''}</td>
            <td style="word-break: break-all">${citem.bankAccno || ''}</td>
            <td style="word-break: break-all">${citem.bankNo || ''}</td>
        </tr>
      `
      trList += tr
    })
  }
  return `<div class="fcLendingVoucher-viewVoucher-box " style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期清算凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期日期：${that.date(item.expireDate)}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="td-breakAll" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号</td>
                            <td>开单企业</td>
                            <td>业务方</td>
                            <td>原始持单企业</td>
                            <td>最终持有企业</td>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                            <td>返还/扣除金额</td>
                            <td>最终付款金额</td>
                            <td>收款账户户名</td>
                            <td>开户行</td>
                            <td>银行账号</td>
                            <td>联行号</td>
                          </tr>
                          `
                      + trList +
                      `</table>
                      <div>
                        <span style="margin-right: 2em">经办人：${item.applyUser}</span>
                        <span>复核人：${item.reviewUser}</span>
                      </div>
                    </div>`
}
//核心企业到期付款凭证（代付模式/虚拟户模式） √
function expire3(item,that) {
  let trList = ''
  if(item.innerVoucherModelList && item.innerVoucherModelList.length){
    item.innerVoucherModelList.map(citem => {
      let tr = `
        <tr>
            <td style="word-break: break-all">${citem.ebillCode || ''}</td>
            <td style="word-break: break-all">${citem.receiptEntName || ''}</td>
            <td style="word-break: break-all">${that.money(citem.ebillAmt)}</td>
            <td style="word-break: break-all">${that.date(citem.openDate)}</td>
        </tr>
      `
      trList += tr
    })
  }
  return `<div class="fcLendingVoucher-viewVoucher-box" style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">
                                <label style="margin-right: 1em">开单企业：${item.payEntName}</label>
                                <label>业务方：${item.createEntName}</label>
                              </td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期付款凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期日期：${that.date(item.expireDate)}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="td-breakAll" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号</td>
                            <td>原始持单企业</td>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                            <td>开单日期</td>
                          </tr>
                          `
    + trList +
    `</table>
                      <div style="display: flex;justify-content: center">
                        <div style="padding-top: 0.5em">
                          <div>收款企业：${item.entName || ''}</div>
                          <div>收款账户户名：${item.bankAccname || ''}</div>
                          <div>开户行：${item.bankName || ''}</div>
                          <div>银行账号：${item.bankAccno || ''}</div>
                          <div>联行号：${item.bankNo || ''}</div>
                        </div>
                      </div>
                    </div>`
}
//核心企业到期付款凭证（直接清算-付资金方）√
function expire4(item,that) {
  let trList = ''
  if(item.innerVoucherModelList && item.innerVoucherModelList.length){
    item.innerVoucherModelList.map(citem => {
      let tr = `
        <tr>
            <td style="word-break: break-all">${citem.ebillCode || ''}</td>
            <td style="word-break: break-all">${citem.payEntName || ''}</td>
            <td style="word-break: break-all">${citem.createEntName || ''}</td>
            <td style="word-break: break-all">${citem.receiptEntName || ''}</td>
            <td style="word-break: break-all">${citem.financingEntName || ''}</td>
            <td style="word-break: break-all">${that.money(citem.ebillAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.returnAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.payAmt)}</td>
        </tr>
      `
      trList += tr
    })
  }
  return `<div class="fcLendingVoucher-viewVoucher-box" style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td style="text-align: left;">凭证编号：${item.voucherNo}</td>
                              <td style="text-align: right;">资金方企业：${item.fundingEntName}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">
                                <label style="margin-right: 1em">开单企业名称：${item.payEntName}</label>
                                <label>业务方：${item.createEntName}</label>
                              </td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期付款凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期日期：${that.date(item.expireDate)}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="td-breakAll" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号</td>
                            <td>开单企业</td>
                            <td>业务方</td>
                            <td>原始持单企业</td>
                            <td>融资企业</td>
                            <td>融资${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                            <td>返还/扣除金额</td>
                            <td>最终付款金额</td>
                          </tr>
                          `
    + trList +
    `</table>
                      <div style="display: flex;justify-content: center">
                        <div style="padding-top: 0.5em">
                          <div>收款账户户名：${item.bankAccname || ''}</div>
                          <div>开户行：${item.bankName || ''}</div>
                          <div>银行账号：${item.bankAccno || ''}</div>
                          <div>联行号：${item.bankNo || ''}</div>
                        </div>
                      </div>
                    </div>`
}
//核心企业到期付款凭证（直接清算-付持有人）√
function expire5(item,that) {
  let trList = ''
  if(item.innerVoucherModelList && item.innerVoucherModelList.length){
    item.innerVoucherModelList.map(citem => {
      let tr = `
        <tr>
            <td style="word-break: break-all">${citem.ebillCode || ''}</td>
            <td style="word-break: break-all">${citem.receiptEntName || ''}</td>
            <td style="word-break: break-all">${citem.holderName || ''}</td>
            <td style="word-break: break-all">${that.money(citem.ebillAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.returnAmt)}</td>
            <td style="word-break: break-all">${that.money(citem.payAmt)}</td>
            <td style="word-break: break-all">${citem.bankAccname || ''}</td>
            <td style="word-break: break-all">${citem.bankName || ''}</td>
            <td style="word-break: break-all">${citem.bankAccno || ''}</td>
            <td style="word-break: break-all">${citem.bankNo || ''}</td>
        </tr>
      `
      trList += tr
    })
  }
  return `<div class="fcLendingVoucher-viewVoucher-box" style="width: 750px;">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;">
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">凭证编号：${item.voucherNo}</td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" style="text-align: left;width: 100%">
                                <label style="margin-right: 1em">开单企业名称：${item.payEntName}</label>
                                <label>业务方：${item.createEntName}</label>
                              </td>
                          </tr>
                          <tr style="width: 100%">
                              <td colspan="2" align="center" style="font-weight:bold;">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期付款凭证</td>
                          </tr>
                          <tr style="width: 100%">
                              <td style="text-align: left;width: 50%">${that.$i18n.messages[that.$i18n.locale].lang.financingName}到期日期：${that.date(item.expireDate)}</td>
                              <td style="text-align: right;width: 50%">打印日期：${that.date(item.printDate)}</td>
                          </tr>
                      </table>

                      <table class="td-breakAll" border="1" cellpadding="0" cellspacing="0" style="width: 100%;table-layout:fixed;text-align: center;">
                          <tr>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}编号</td>
                            <td>原始持单企业</td>
                            <td>最终持有企业</td>
                            <td>${that.$i18n.messages[that.$i18n.locale].lang.financingName}金额</td>
                            <td>返还/扣除金额</td>
                            <td>最终付款金额</td>
                            <td>收款账户户名</td>
                            <td>开户行</td>
                            <td>银行账号</td>
                            <td>联行号</td>
                          </tr>
                          `
                          + trList +
                    `</table>
                    </div>`
}

export default function (item,vType,that) {
  if(item[vType] === 'KD01'){
    return open(item,that)
  }else if(item[vType] === 'KD02'){
    return hold(item,that)
  }else if(item[vType] === 'ZR01'){
    return transfer(item,that)
  }else if(item[vType] === 'RZ01'){
    return finan(item,that)
  }else if(item[vType] === 'FK01'){
    return loan(item,that)
  }else if(item[vType] === 'ZF01'){
    return obsolete(item,that) //
  }else if(item[vType] === 'DQ01'){
    return expire(item,that)
  }else if(item[vType] === 'DQ02'){
    return expire2(item,that)
  }else if(item[vType] === 'DQ03'){
    return expire3(item,that)
  }else if(item[vType] === 'DQ04'){
    return expire4(item,that)
  }else if(item[vType] === 'DQ05'){
    return expire5(item,that)
  }else if(item[vType] === 'DQ06'){
    return alter(item,that)
  }else{
    return '<div>凭证类型错误</div>'
  }
}
