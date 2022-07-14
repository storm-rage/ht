/**
 * created on 2020/02/26 by longks
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
let localeStr = 'zifp'

const i18n = new VueI18n({
  locale: localeStr,
  silentTranslationWarn: true,
  messages
})

export default i18n
