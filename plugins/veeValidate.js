import Vue from 'vue'
import { extend, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

Vue.component('ValidationProvider', ValidationProvider)

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})
