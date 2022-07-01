import moment from 'moment';
export default {
  install: function (Vue) {
    Vue.prototype.$moment = moment;
  }
}
