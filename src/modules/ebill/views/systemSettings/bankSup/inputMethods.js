export default {
  methods:{
    interestRateInput(){
      this.formModel.interestRate = this.formModel.interestRate.replace(/[^\d\.]/g, '')
      this.formModel.interestRate = this.formModel.interestRate.replace(/^\./g, '')
      this.formModel.interestRate = this.formModel.interestRate.replace(/\.{2,}/g, '.')
      this.formModel.interestRate = this.formModel.interestRate.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')

      let newRateList = this.formModel.interestRate.split('.')
      if (Number(newRateList[0]) > 99) {
        newRateList[0] = newRateList[0].slice(0, 2)
      }
      if (newRateList[0] && Number(newRateList[0]) < 10) {
        newRateList[0] = Number(newRateList[0]) + ''
      }
      if (Number(newRateList[1]) > 9999 || (newRateList[1] && newRateList[1].length > 4)) {
        newRateList[1] = newRateList[1].slice(0, 4)
      }
      this.formModel.interestRate = newRateList.join('.')
    },
    interestRateBlur(){
      let splitList = this.formModel.interestRate.split('.')
      if (Number(splitList[0]) > 0 && Number(splitList[0]) < 10) {
        splitList[0] = Number(splitList[0]) + ''
      }
      if (!splitList[0]) {
        splitList[0] = ''
      }
      // splitList[0] = Number(splitList[0])+''
      this.formModel.interestRate = splitList.join('.')
    },
    blFeeRateInput(){
      this.formModel.blFeeRate = this.formModel.blFeeRate.replace(/[^\d\.]/g, '')
      this.formModel.blFeeRate = this.formModel.blFeeRate.replace(/^\./g, '')
      this.formModel.blFeeRate = this.formModel.blFeeRate.replace(/\.{2,}/g, '.')
      this.formModel.blFeeRate = this.formModel.blFeeRate.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')

      let newRateList = this.formModel.blFeeRate.split('.')
      if (Number(newRateList[0]) > 99) {
        newRateList[0] = newRateList[0].slice(0, 2)
      }
      if (newRateList[0] && Number(newRateList[0]) < 10) {
        newRateList[0] = Number(newRateList[0]) + ''
      }
      if (Number(newRateList[1]) > 9999 || (newRateList[1] && newRateList[1].length > 4)) {
        newRateList[1] = newRateList[1].slice(0, 4)
      }
      this.formModel.blFeeRate = newRateList.join('.')
    },
    blFeeRateBlur(){
      let splitList = this.formModel.blFeeRate.split('.')
      if (Number(splitList[0]) > 0 && Number(splitList[0]) < 10) {
        splitList[0] = Number(splitList[0]) + ''
      }
      if (!splitList[0]) {
        splitList[0] = ''
      }
      // splitList[0] = Number(splitList[0])+''
      this.formModel.blFeeRate = splitList.join('.')
    },
    plFeeRateInput(){
      this.formModel.plFeeRate = this.formModel.plFeeRate.replace(/[^\d\.]/g, '')
      this.formModel.plFeeRate = this.formModel.plFeeRate.replace(/^\./g, '')
      this.formModel.plFeeRate = this.formModel.plFeeRate.replace(/\.{2,}/g, '.')
      this.formModel.plFeeRate = this.formModel.plFeeRate.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')

      let newRateList = this.formModel.plFeeRate.split('.')
      if (Number(newRateList[0]) > 99) {
        newRateList[0] = newRateList[0].slice(0, 2)
      }
      if (newRateList[0] && Number(newRateList[0]) < 10) {
        newRateList[0] = Number(newRateList[0]) + ''
      }
      if (Number(newRateList[1]) > 9999 || (newRateList[1] && newRateList[1].length > 4)) {
        newRateList[1] = newRateList[1].slice(0, 4)
      }
      this.formModel.plFeeRate = newRateList.join('.')
    },
    plFeeRateBlur(){
      let splitList = this.formModel.plFeeRate.split('.')
      if (Number(splitList[0]) > 0 && Number(splitList[0]) < 10) {
        splitList[0] = Number(splitList[0]) + ''
      }
      if (!splitList[0]) {
        splitList[0] = ''
      }
      // splitList[0] = Number(splitList[0])+''
      this.formModel.plFeeRate = splitList.join('.')
    },
  }
}
