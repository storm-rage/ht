import Vue from 'vue'
import * as filters from './filters'

const filter = Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default {
  filter
}
