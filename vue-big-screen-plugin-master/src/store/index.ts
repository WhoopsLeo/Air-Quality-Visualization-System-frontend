import { createStore } from 'vuex'

// 全局组件传值中心,可以把值保存在这里
export default createStore({
  state: {
    year: '',
    name: '',
    currentYear: ''
  },
  mutations: {
    addYear(state,step){
      state.year = step;
    },
    addName(state,step){
      state.name = step;
    },
    addCurrentYear(state,step){
      state.currentYear = step;
    },
  },
  actions: {
  },
  modules: {
  }
})
