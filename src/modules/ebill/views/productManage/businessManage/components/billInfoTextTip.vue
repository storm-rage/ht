<template>
  <zj-content-tip class="zj-inline zj-m-t-10" backgroundColor="#FFF">
    <div><i style="color:#F18C3C;" class="zj-m-r-5 el-icon-info"></i>注：</div>
    <div class="zj-m-l-15">
      <p>1.开单最长期限小于等于365天。</p>
      <p>2.凭证可用折扣：该参数控制凭证原始持有人对凭证的最大可使用金额，以及凭证持有人的最大融资金额。即凭证最大可使用金额=凭证可用折扣*凭证金额。</p>
      <p>3.开单宽限天数：控制凭证到期日。凭证到期日=对账单预计付款日+开单宽限天数。</p>
      <p>4.凭证融资日利率=凭证融资月利率/30。</p>
    </div>
  </zj-content-tip>
</template>
<script>
export default {};
</script>
