import Vue from 'vue'
import * as filters from './filters'

// Object.keys处理对象，返回可枚举的属性数组
Object.keys(filters).forEach(k=>Vue.filter(k,filters[k]))