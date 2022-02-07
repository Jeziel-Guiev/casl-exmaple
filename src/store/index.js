import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resource:'',
    username: null,
    auth: null,
    tareas:[],
    correos:[],
    user:{}
  },
  // getters:{
  //   tareas: state=> state.tareas
  // },
  mutations: {
    doLogin(state, username) {
      state.auth = true;
      state.username = username;
    },
    saveResource(state, subject) {
      state.resource = subject;
      //state.username = username;
    },
    doLogout(state) {
      state.auth = false;
      state.username = null;
    },
    cargarTareas(state,tareas){
      state.tareas = tareas
    },
    cargarCorreos(state,correo){
      state.correos.push(correo);
    },
    cargarUser(state,user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
