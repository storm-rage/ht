/**
 * created on 2020/02/26 by longks
 */
import Vue from 'vue'
// import locale from "element-ui/lib/locale";
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
// let localeStr = 'rong'
let localeStr = 'zifp'
/*if (location.hostname.indexOf('bears.izejin.com') !== -1) {
  localeStr = 'bear'
} else if (location.hostname.indexOf('zifp') !== -1) {
  localeStr = 'zifp'
}
console.log(localeStr)*/

const i18n = new VueI18n({
  locale: localeStr,
  silentTranslationWarn: true,
  messages
})

// locale.i18n((key, value) => i18n.t(key, value))
export default i18n
