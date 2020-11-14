import axios from 'axios'
import { createToken } from 'vue-stripe-elements-plus'

export default {
  setIsStripeCardCompleted: ({ commit }, payload) =>
    commit('SET_IS_STRIPE_CARD_COMPLETED', payload),

  setStatus: ({ commit }, payload) =>
    commit('SET_STATUS', payload),

  pay: async ({ commit, dispatch }, { userData, total, url }) => {
    commit('SET_IS_LOADING', true)

    const { token } = await createToken()

    commit('SET_IS_SUBMITTED', true)

    try {
      const { data: stripeResponse } = await axios.post(
        url,
        {
          userData,
          stripeToken: token.id,
          stripeAmt: total * 100 // must be in cent
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      commit('SET_STATUS', 'success')

      dispatch('cart/clearCount', null, { root: true })
      dispatch('cart/clearContents', null, { root: true })
      dispatch('cart/setSuccess', true, { root: true })
      dispatch('cart/setActualStep', 3, { root: true })

      const { message: stripeResponseMessage } = stripeResponse
      commit('SET_RESPONSE', stripeResponseMessage)
    } catch (err) {
      commit('SET_STATUS', 'failure')
      commit('SET_RESPONSE', `Error: ${JSON.stringify(err, null, 2)}`)
    }
    commit('SET_IS_LOADING', false)
  },
  clearCheckout({ commit }) {
    commit('SET_IS_SUBMITTED', false)
    commit('SET_IS_STRIPE_CARD_COMPLETED', false)
    commit('SET_STATUS', '')
    commit('SET_RESPONSE', '')
  }
}
