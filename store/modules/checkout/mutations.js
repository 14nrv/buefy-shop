export default {
  SET_IS_SUBMITTED: (state, bool) => { state.isSubmitted = bool },
  SET_IS_STRIPE_CARD_COMPLETED: (state, bool) => { state.isStripeCardCompleted = bool },
  SET_IS_LOADING: (state, bool) => { state.isLoading = bool },
  SET_STATUS: (state, payload) => { state.status = payload },
  SET_RESPONSE: (state, payload) => { state.response = payload }
}
