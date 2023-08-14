// store/index.js
import Vuex from "vuex";
import Cookies from "js-cookie";
import { verifyTokenRequest } from "../api/auth.js";

export const store = new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ISAUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    async verifyToken({ commit }) {
      const cookies = Cookies.get();
      if (!cookies.token) {
        commit("SET_USER", null);
        commit("SET_ISAUTHENTICATED", false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          commit("SET_USER", null);
          commit("SET_ISAUTHENTICATED", false);
          return;
        }
        console.log("Datos cargados");
        commit("SET_USER", res.data);
        commit("SET_ISAUTHENTICATED", true);
      } catch (error) {
        commit("SET_USER", null);
        commit("SET_ISAUTHENTICATED", false);
      }
    },
  },
  getters: {
    fullNameUser(state) {
      return state.user.user.first_name + " " + state.user.user.last_name;
    },
    isLogin(state) {
      return state.isAuthenticated;
    },
    isSAdmin(state) {
      return state.user.role.name === "SAdmin";
    },
    isRRHH(state) {
      return state.user.role.name === "RRHH";
    },
    isPorter(state) {
      return state.user.role.name === "Portero";
    },
  },
  modules: {},
});
