import { version } from '@/package.json'

const state = {
  version
}
const getters = {
  version: ({ version }) => version
}

export default {
  namespaced: true,
  state,
  getters
}
