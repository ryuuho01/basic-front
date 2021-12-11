export const state = () => ({
  shopCurrent: [],
})
 
export const getters = {
  shopcards: state => {
    return state.shopCurrent
  },
}
 
export const mutations = {
  setData(state, data) {
    state.shopCurrent = data
  },
}