import { version, name } from '@/package.json'

const state = {
  version,
  name
}
const getters = {
  version: ({ version }) => version,
  name: ({ name }) => name
}

export default {
  namespaced: true,
  state,
  getters
}
