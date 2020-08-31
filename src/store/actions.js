const actions = {
  toggleSide: ({ commit, state }) => {
    commit('toggleSide')// toggleSide(commit, state);
  },
  login: ({ commit, state }, str) => {
    commit('login', str)
  },
  cancelOutLogin: ({ commit }) => {
    commit('cancelOutLogin')
  },
  outLoginOne: ({ commit, state }) => {
    commit('outLoginOne')
  },
  saveColumnList: ({ commit, state }, list) => {
    commit('saveColumnList', list)
  },
  outLogin: ({ commit, state }) => {
    commit('outLogin')
  },
  addTab: ({ commit, state }, data) => {
    // type 0增 1减 2，全删
    commit('addTab', data)
  },
  deleteTab: ({ commit, state }, data) => {
    commit('deleteTab', data)
  },
  ContextOn: ({ commit, state }, data) => {
    commit('ContextOn')
  },
  ContextOff: ({ commit, state }, data) => {
    commit('ContextOff')
  },
  showRecommend: ({ commit, state }, data) => {
    commit('showRecommend')
  },
  hideRecommend: ({ commit, state }, data) => {
    commit('hideRecommend')
  }
}
export default actions
